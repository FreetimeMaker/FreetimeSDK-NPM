import { CoinType } from './types';
import bs58 from 'bs58';
import * as bech32 from 'bech32';

// Import type declarations
/// <reference path="./types.d.ts" />

export class CryptoUtils {
  static generateTransactionHash(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return 'tx_' + timestamp + '_' + random;
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

  private static validateBitcoinAddress(address: string): boolean {
    try {
      const decoded = bs58.decode(address);
      if (decoded.length !== 25) return false;
      
      const version = decoded[0];
      if (version !== 0x00) return false;
      
      const checksum = decoded.slice(-4);
      const hash = decoded.slice(0, -4);
      
      const crypto = require('crypto');
      const calculatedChecksum = crypto.createHash('sha256')
        .update(crypto.createHash('sha256').update(hash).digest())
        .digest()
        .slice(0, 4);
      
      return checksum.every((val, i) => val === calculatedChecksum[i]);
    } catch {
      return false;
    }
  }

  private static validateEthereumAddress(address: string): boolean {
    if (!address.startsWith('0x') || address.length !== 42) {
      return false;
    }
    
    const hexPart = address.substring(2);
    return /^[0-9a-fA-F]+$/.test(hexPart);
  }

  private static validateLitecoinAddress(address: string): boolean {
    try {
      const decoded = bs58.decode(address);
      if (decoded.length !== 25) return false;
      
      const version = decoded[0];
      if (version !== 0x30) return false;
      
      return true;
    } catch {
      return false;
    }
  }

  private static validateBitcoinCashAddress(address: string): boolean {
    // Simple validation for Bitcoin Cash addresses
    return address.startsWith('bitcoincash:') || address.startsWith('bchtest:');
  }

  private static validateDogecoinAddress(address: string): boolean {
    try {
      const decoded = bs58.decode(address);
      if (decoded.length !== 25) return false;
      
      const version = decoded[0];
      return version === 0x1e || version === 0x71;
    } catch {
      return false;
    }
  }

  private static validateSolanaAddress(address: string): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  }

  private static validateBinanceCoinAddress(address: string): boolean {
    if (address.startsWith('bnb')) {
      return /^[1-9A-HJ-NP-Za-km-z]{39}$/.test(address.substring(3));
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
