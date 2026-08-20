import { CoinType } from './types';
/**
 * Enhanced Cryptography Utilities for Freetime SDK.
 * Aligned with Android SDK v1.1.0 security enhancements.
 */
export declare class CryptoUtils {
    /**
     * Secure Storage Abstraction (Simulates Android Keystore)
     */
    private static secureStorage;
    /**
     * Biometric Simulation for Node.js (Simulates Android BiometricPrompt)
     */
    private static biometricAuthenticated;
    static generateTransactionHash(): string;
    static validateAddress(address: string, coinType: CoinType): boolean;
    /**
     * Perform a secure signing operation with biometric-like authentication
     */
    static signSecurely(data: string, privateKey: string, requireAuth?: boolean): Promise<string>;
    /**
     * Simulate Biometric Authentication
     */
    static authenticateUser(): boolean;
    /**
     * Reset authentication state (Auth-Per-Use simulation)
     */
    static lockSecurity(): void;
    private static validateBitcoinAddress;
    private static validateEthereumAddress;
    private static validateLitecoinAddress;
    private static validateBitcoinCashAddress;
    private static validateDogecoinAddress;
    private static validateSolanaAddress;
    private static validateBinanceCoinAddress;
    private static validateTronAddress;
}
//# sourceMappingURL=CryptoUtils.d.ts.map