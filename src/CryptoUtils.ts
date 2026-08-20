import { CoinType } from './types';
import bs58 from 'bs58';
import * as bech32 from 'bech32';
import crypto from 'crypto';

// Import type declarations
/// <reference path="./types.d.ts" />

/**
 * Enhanced Cryptography Utilities for Freetime SDK.
 * Aligned with Android SDK v1.1.0 security enhancements.
 */
export class CryptoUtils {

  /**
   * Secure Storage Abstraction (Simulates Android Keystore)
   */
  private static secureStorage = new Map<string, string>();

  /**
   * Biometric Simulation for Node.js (Simulates Android BiometricPrompt)
   */
  private static biometricAuthenticated: boolean = false;

  static generateTransactionHash(): string {
    return 'tx_' + crypto.randomBytes(16).toString('hex');
  }

  static validateAddress(address: string, coinType: CoinType): boolean {
    if (!address || address.length === 0) {
      return false;
    }

    try {
      switch (coinType) {
        case CoinType.BITCOIN:
          return CryptoUtils.validateBitcoinAddress(address);
        case CoinType.ETHEREUM:
          return CryptoUtils.validateEthereumAddress(address);
        case CoinType.LITECOIN:
          return CryptoUtils.validateLitecoinAddress(address);
        case CoinType.BITCOIN_CASH:
          return CryptoUtils.validateBitcoinCashAddress(address);
        case CoinType.DOGECOIN:
          return CryptoUtils.validateDogecoinAddress(address);
        case CoinType.SOLANA:
          return CryptoUtils.validateSolanaAddress(address);
        case CoinType.POLYGON:
          return CryptoUtils.validateEthereumAddress(address);
        case CoinType.BINANCE_COIN:
          return CryptoUtils.validateBinanceCoinAddress(address);
        case CoinType.TRON:
          return CryptoUtils.validateTronAddress(address);
        default:
          return address.length >= 26 && address.length <= 95;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Perform a secure signing operation with biometric-like authentication
   */
  static async signSecurely(data: string, privateKey: string, requireAuth: boolean = false): Promise<string> {
    if (requireAuth && !this.biometricAuthenticated) {
      throw new Error("Authentication required for this operation (BIOMETRIC_STRONG simulation)");
    }

    const signer = crypto.createSign('sha256');
    signer.update(data);
    signer.end();

    // In a real Node.js app, you'd use a real key, but here we simulate the process
    return signer.sign(crypto.generateKeyPairSync('rsa', { modulusLength: 2048 }).privateKey).toString('hex');
  }

  /**
   * Simulate Biometric Authentication
   */
  static authenticateUser(): boolean {
    // In Node.js, this could be a password check or just a simulated prompt
    this.biometricAuthenticated = true;
    return true;
  }

  /**
   * Reset authentication state (Auth-Per-Use simulation)
   */
  static lockSecurity(): void {
    this.biometricAuthenticated = false;
  }

  private static validateBitcoinAddress(address: string): boolean {
    try {
      // Legacy P2PKH or P2SH
      if (address.startsWith('1') || address.startsWith('3')) {
        const decoded = bs58.decode(address);
        if (decoded.length !== 25) return false;
        const checksum = decoded.slice(-4);
        const hash = decoded.slice(0, -4);
        const calculatedChecksum = crypto.createHash('sha256')
          .update(crypto.createHash('sha256').update(hash).digest())
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
    } catch {
      return false;
    }
  }

  private static validateEthereumAddress(address: string): boolean {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
  }

  private static validateLitecoinAddress(address: string): boolean {
    try {
      // Legacy or SegWit
      if (address.startsWith('L') || address.startsWith('M')) {
        const decoded = bs58.decode(address);
        return decoded.length === 25;
      }
      if (address.toLowerCase().startsWith('ltc1')) {
        const decoded = bech32.bech32.decode(address);
        return decoded.prefix === 'ltc';
      }
      return false;
    } catch {
      return false;
    }
  }

  private static validateBitcoinCashAddress(address: string): boolean {
    // Simplified CashAddr validation
    return address.startsWith('bitcoincash:') || /^[qp][a-z0-9]{41}$/.test(address);
  }

  private static validateDogecoinAddress(address: string): boolean {
    try {
      const decoded = bs58.decode(address);
      return decoded.length === 25 && (decoded[0] === 0x1e || decoded[0] === 0x16);
    } catch {
      return false;
    }
  }

  private static validateSolanaAddress(address: string): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  }

  private static validateBinanceCoinAddress(address: string): boolean {
    if (address.startsWith('bnb')) {
      try {
        const decoded = bech32.bech32.decode(address);
        return decoded.prefix === 'bnb';
      } catch {
        return false;
      }
    }
    return CryptoUtils.validateEthereumAddress(address);
  }

  private static validateTronAddress(address: string): boolean {
    if (!address.startsWith('T') || address.length !== 34) {
      return false;
    }
    try {
      bs58.decode(address);
      return true;
    } catch {
      return false;
    }
  }
}
