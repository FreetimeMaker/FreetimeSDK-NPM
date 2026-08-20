"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtils = void 0;
const types_1 = require("./types");
const bs58_1 = __importDefault(require("bs58"));
const bech32 = __importStar(require("bech32"));
const crypto_1 = __importDefault(require("crypto"));
// Import type declarations
/// <reference path="./types.d.ts" />
/**
 * Enhanced Cryptography Utilities for Freetime SDK.
 * Aligned with Android SDK v1.1.0 security enhancements.
 */
class CryptoUtils {
    static generateTransactionHash() {
        return 'tx_' + crypto_1.default.randomBytes(16).toString('hex');
    }
    static validateAddress(address, coinType) {
        if (!address || address.length === 0) {
            return false;
        }
        try {
            switch (coinType) {
                case types_1.CoinType.BITCOIN:
                    return CryptoUtils.validateBitcoinAddress(address);
                case types_1.CoinType.ETHEREUM:
                    return CryptoUtils.validateEthereumAddress(address);
                case types_1.CoinType.LITECOIN:
                    return CryptoUtils.validateLitecoinAddress(address);
                case types_1.CoinType.BITCOIN_CASH:
                    return CryptoUtils.validateBitcoinCashAddress(address);
                case types_1.CoinType.DOGECOIN:
                    return CryptoUtils.validateDogecoinAddress(address);
                case types_1.CoinType.SOLANA:
                    return CryptoUtils.validateSolanaAddress(address);
                case types_1.CoinType.POLYGON:
                    return CryptoUtils.validateEthereumAddress(address);
                case types_1.CoinType.BINANCE_COIN:
                    return CryptoUtils.validateBinanceCoinAddress(address);
                case types_1.CoinType.TRON:
                    return CryptoUtils.validateTronAddress(address);
                default:
                    return address.length >= 26 && address.length <= 95;
            }
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Perform a secure signing operation with biometric-like authentication
     */
    static async signSecurely(data, privateKey, requireAuth = false) {
        if (requireAuth && !this.biometricAuthenticated) {
            throw new Error("Authentication required for this operation (BIOMETRIC_STRONG simulation)");
        }
        const signer = crypto_1.default.createSign('sha256');
        signer.update(data);
        signer.end();
        // In a real Node.js app, you'd use a real key, but here we simulate the process
        return signer.sign(crypto_1.default.generateKeyPairSync('rsa', { modulusLength: 2048 }).privateKey).toString('hex');
    }
    /**
     * Simulate Biometric Authentication
     */
    static authenticateUser() {
        // In Node.js, this could be a password check or just a simulated prompt
        this.biometricAuthenticated = true;
        return true;
    }
    /**
     * Reset authentication state (Auth-Per-Use simulation)
     */
    static lockSecurity() {
        this.biometricAuthenticated = false;
    }
    static validateBitcoinAddress(address) {
        try {
            // Legacy P2PKH or P2SH
            if (address.startsWith('1') || address.startsWith('3')) {
                const decoded = bs58_1.default.decode(address);
                if (decoded.length !== 25)
                    return false;
                const checksum = decoded.slice(-4);
                const hash = decoded.slice(0, -4);
                const calculatedChecksum = crypto_1.default.createHash('sha256')
                    .update(crypto_1.default.createHash('sha256').update(hash).digest())
                    .digest()
                    .slice(0, 4);
                return checksum.every((val, i) => val === calculatedChecksum[i]);
            }
            // SegWit (Bech32)
            if (address.toLowerCase().startsWith('bc1')) {
                const decoded = bech32.bech32.decode(address);
                return decoded.prefix === 'bc';
            }
            return false;
        }
        catch {
            return false;
        }
    }
    static validateEthereumAddress(address) {
        return /^0x[0-9a-fA-F]{40}$/.test(address);
    }
    static validateLitecoinAddress(address) {
        try {
            // Legacy or SegWit
            if (address.startsWith('L') || address.startsWith('M')) {
                const decoded = bs58_1.default.decode(address);
                return decoded.length === 25;
            }
            if (address.toLowerCase().startsWith('ltc1')) {
                const decoded = bech32.bech32.decode(address);
                return decoded.prefix === 'ltc';
            }
            return false;
        }
        catch {
            return false;
        }
    }
    static validateBitcoinCashAddress(address) {
        // Simplified CashAddr validation
        return address.startsWith('bitcoincash:') || /^[qp][a-z0-9]{41}$/.test(address);
    }
    static validateDogecoinAddress(address) {
        try {
            const decoded = bs58_1.default.decode(address);
            return decoded.length === 25 && (decoded[0] === 0x1e || decoded[0] === 0x16);
        }
        catch {
            return false;
        }
    }
    static validateSolanaAddress(address) {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }
    static validateBinanceCoinAddress(address) {
        if (address.startsWith('bnb')) {
            try {
                const decoded = bech32.bech32.decode(address);
                return decoded.prefix === 'bnb';
            }
            catch {
                return false;
            }
        }
        return CryptoUtils.validateEthereumAddress(address);
    }
    static validateTronAddress(address) {
        if (!address.startsWith('T') || address.length !== 34) {
            return false;
        }
        try {
            bs58_1.default.decode(address);
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.CryptoUtils = CryptoUtils;
/**
 * Secure Storage Abstraction (Simulates Android Keystore)
 */
CryptoUtils.secureStorage = new Map();
/**
 * Biometric Simulation for Node.js (Simulates Android BiometricPrompt)
 */
CryptoUtils.biometricAuthenticated = false;
//# sourceMappingURL=CryptoUtils.js.map