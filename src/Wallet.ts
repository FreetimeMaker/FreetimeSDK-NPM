import { CoinType, Wallet, PaymentInterface } from './types';
import * as crypto from 'crypto';
import { ec } from 'elliptic';
import bs58 from 'bs58';
import * as bech32 from 'bech32';

// Import type declarations
/// <reference path="./types.d.ts" />

export class WalletImpl implements Wallet {
  constructor(
    public address: string,
    public coinType: CoinType,
    public publicKey: string,
    public privateKey: string,
    public name?: string
  ) {}

  static create(coinType: CoinType, name?: string): WalletImpl {
    const privateKey = crypto.randomBytes(32).toString('hex');
    const ecInstance = new ec('secp256k1');
    const keyPair = ecInstance.keyFromPrivate(privateKey, 'hex');
    const publicKey = keyPair.getPublic(false, 'hex').substring(2);
    
    let address: string;
    
    switch (coinType) {
      case CoinType.BITCOIN:
        address = WalletImpl.generateBitcoinAddress(publicKey);
        break;
      case CoinType.ETHEREUM:
        address = WalletImpl.generateEthereumAddress(publicKey);
        break;
      case CoinType.LITECOIN:
        address = WalletImpl.generateLitecoinAddress(publicKey);
        break;
      case CoinType.BITCOIN_CASH:
        address = WalletImpl.generateBitcoinCashAddress(publicKey);
        break;
      case CoinType.DOGECOIN:
        address = WalletImpl.generateDogecoinAddress(publicKey);
        break;
      default:
        address = WalletImpl.generateGenericAddress(publicKey, coinType);
    }
    
    return new WalletImpl(address, coinType, publicKey, privateKey, name);
  }

  private static generateBitcoinAddress(publicKey: string): string {
    const sha256Hash = crypto.createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest();
    const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
    
    const versionedHash = Buffer.concat([Buffer.from([0x00]), ripemd160Hash]);
    const checksum = crypto.createHash('sha256').update(crypto.createHash('sha256').update(versionedHash).digest()).digest().slice(0, 4);
    const addressBytes = Buffer.concat([versionedHash, checksum]);
    
    return bs58.encode(addressBytes);
  }

  private static generateEthereumAddress(publicKey: string): string {
    const hash = crypto.createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest();
    const address = hash.slice(-20);
    return '0x' + address.toString('hex');
  }

  private static generateLitecoinAddress(publicKey: string): string {
    const sha256Hash = crypto.createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest();
    const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
    
    const versionedHash = Buffer.concat([Buffer.from([0x30]), ripemd160Hash]);
    const checksum = crypto.createHash('sha256').update(crypto.createHash('sha256').update(versionedHash).digest()).digest().slice(0, 4);
    const addressBytes = Buffer.concat([versionedHash, checksum]);
    
    return bs58.encode(addressBytes);
  }

  private static generateBitcoinCashAddress(publicKey: string): string {
    // Simplified Bitcoin Cash address generation
    const sha256Hash = crypto.createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest();
    const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
    
    // For simplicity, generate a base58 address similar to Bitcoin
    const versionedHash = Buffer.concat([Buffer.from([0x00]), ripemd160Hash]);
    const checksum = crypto.createHash('sha256').update(crypto.createHash('sha256').update(versionedHash).digest()).digest().slice(0, 4);
    const addressBytes = Buffer.concat([versionedHash, checksum]);
    
    return 'bitcoincash:' + bs58.encode(addressBytes);
  }

  private static generateDogecoinAddress(publicKey: string): string {
    const sha256Hash = crypto.createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest();
    const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();
    
    const versionedHash = Buffer.concat([Buffer.from([0x1e]), ripemd160Hash]);
    const checksum = crypto.createHash('sha256').update(crypto.createHash('sha256').update(versionedHash).digest()).digest().slice(0, 4);
    const addressBytes = Buffer.concat([versionedHash, checksum]);
    
    return bs58.encode(addressBytes);
  }

  private static generateGenericAddress(publicKey: string, coinType: CoinType): string {
    const hash = crypto.createHash('sha256').update(Buffer.from(publicKey, 'hex')).digest();
    return coinType.toLowerCase() + hash.slice(-20).toString('hex');
  }

  async getBalance(paymentProvider: PaymentInterface): Promise<string> {
    return await paymentProvider.getBalance(this.address);
  }

  async send(toAddress: string, amount: string, paymentProvider: PaymentInterface) {
    return await paymentProvider.send(toAddress, amount);
  }
}
