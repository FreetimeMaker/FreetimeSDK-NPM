export enum CoinType {
  BITCOIN = 'BTC',
  ETHEREUM = 'ETH',
  LITECOIN = 'LTC',
  BITCOIN_CASH = 'BCH',
  DOGECOIN = 'DOGE',
  SOLANA = 'SOL',
  POLYGON = 'MATIC',
  BINANCE_COIN = 'BNB',
  TRON = 'TRX',
  ALGORAND = 'ALGO',
  APTOS = 'APT',
  ARBITRUM = 'ARB',
  AVALANCHE = 'AVAX',
  BASE = 'BASE',
  CARDANO = 'ADA',
  CELO = 'CELO',
  COSMOS = 'ATOM',
  DASH = 'DASH',
  FANTOM = 'FTM',
  HEDERA = 'HBAR',
  MONERO = 'XMR',
  MULTIVERSX = 'EGLD',
  NANO = 'XNO',
  NEAR = 'NEAR',
  OPTIMISM = 'OP',
  POLKADOT = 'DOT',
  STELLAR = 'XLM',
  SUI = 'SUI',
  TEZOS = 'XTZ',
  VECHAIN = 'VET',
  XRP = 'XRP',
  ZCASH = 'ZEC',
  REVENUE_CAT = 'RCAT'
}

// Add symbol mapping for CoinType
export const COIN_SYMBOLS: Record<CoinType, string> = {
  [CoinType.BITCOIN]: 'BTC',
  [CoinType.ETHEREUM]: 'ETH',
  [CoinType.LITECOIN]: 'LTC',
  [CoinType.BITCOIN_CASH]: 'BCH',
  [CoinType.DOGECOIN]: 'DOGE',
  [CoinType.SOLANA]: 'SOL',
  [CoinType.POLYGON]: 'MATIC',
  [CoinType.BINANCE_COIN]: 'BNB',
  [CoinType.TRON]: 'TRX',
  [CoinType.ALGORAND]: 'ALGO',
  [CoinType.APTOS]: 'APT',
  [CoinType.ARBITRUM]: 'ARB',
  [CoinType.AVALANCHE]: 'AVAX',
  [CoinType.BASE]: 'BASE',
  [CoinType.CARDANO]: 'ADA',
  [CoinType.CELO]: 'CELO',
  [CoinType.COSMOS]: 'ATOM',
  [CoinType.DASH]: 'DASH',
  [CoinType.FANTOM]: 'FTM',
  [CoinType.HEDERA]: 'HBAR',
  [CoinType.MONERO]: 'XMR',
  [CoinType.MULTIVERSX]: 'EGLD',
  [CoinType.NANO]: 'XNO',
  [CoinType.NEAR]: 'NEAR',
  [CoinType.OPTIMISM]: 'OP',
  [CoinType.POLKADOT]: 'DOT',
  [CoinType.STELLAR]: 'XLM',
  [CoinType.SUI]: 'SUI',
  [CoinType.TEZOS]: 'XTZ',
  [CoinType.VECHAIN]: 'VET',
  [CoinType.XRP]: 'XRP',
  [CoinType.ZCASH]: 'ZEC',
  [CoinType.REVENUE_CAT]: 'RCAT'
};

// Extension to get symbol from CoinType
export function getCoinSymbol(coinType: CoinType): string {
  return COIN_SYMBOLS[coinType];
}

export enum PaymentStatus {
  PENDING = 'pending',
  QUEUED = 'queued',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
  FAILED = 'failed',
  NOT_FOUND = 'not_found'
}

export const COIN_TYPE_MAP: Record<string, CoinType> = {
  'BTC': CoinType.BITCOIN,
  'ETH': CoinType.ETHEREUM,
  'LTC': CoinType.LITECOIN,
  'BCH': CoinType.BITCOIN_CASH,
  'DOGE': CoinType.DOGECOIN,
  'SOL': CoinType.SOLANA,
  'MATIC': CoinType.POLYGON,
  'BNB': CoinType.BINANCE_COIN,
  'TRX': CoinType.TRON,
  'ALGO': CoinType.ALGORAND,
  'APT': CoinType.APTOS,
  'ARB': CoinType.ARBITRUM,
  'AVAX': CoinType.AVALANCHE,
  'BASE': CoinType.BASE,
  'ADA': CoinType.CARDANO,
  'CELO': CoinType.CELO,
  'ATOM': CoinType.COSMOS,
  'DASH': CoinType.DASH,
  'FTM': CoinType.FANTOM,
  'HBAR': CoinType.HEDERA,
  'XMR': CoinType.MONERO,
  'EGLD': CoinType.MULTIVERSX,
  'XNO': CoinType.NANO,
  'NEAR': CoinType.NEAR,
  'OP': CoinType.OPTIMISM,
  'DOT': CoinType.POLKADOT,
  'XLM': CoinType.STELLAR,
  'SUI': CoinType.SUI,
  'XTZ': CoinType.TEZOS,
  'VET': CoinType.VECHAIN,
  'XRP': CoinType.XRP,
  'ZEC': CoinType.ZCASH,
  'RCAT': CoinType.REVENUE_CAT
};

/**
 * Configuration for the SDK (Aligned with Android DeveloperConfig).
 */
export interface DeveloperConfig {
  developerId: string;
  enablePromotions?: boolean;
  customPromotionUrl?: string | null;
  hideDefaultPromotions?: boolean;
}

/**
 * Payment request details (Aligned with Android PaymentRequest).
 */
export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  metadata?: Map<string, string>;
}

/**
 * Payment result (Aligned with Android PaymentResult).
 */
export type PaymentResult =
  | { type: 'success'; transactionId: string; amount: number }
  | { type: 'error'; message: string; code?: string }
  | { type: 'cancelled' };

export interface Wallet {
  address: string;
  coinType: CoinType;
  publicKey: string;
  privateKey: string;
  name?: string;
}

export interface Transaction {
  hash: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  fee: string;
  coinType: CoinType;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface FeeBreakdown {
  originalAmount: string;
  networkFee: string;
  developerFee: string;
  developerFeePercentage: string;
  totalFee: string;
  recipientReceives: string;
  developerWallet: string;
  coinType: CoinType;

  getFormattedBreakdown(): string;
}

export interface TransactionWithFees {
  transaction: Transaction;
  feeBreakdown: FeeBreakdown;

  broadcast(): Promise<string>;
  getFormattedSummary(): string;
}

export interface FeeManager {
  getDeveloperFeePercentage(amount: string): string;
  getFeeTier(amount: string): string;
  getDeveloperWalletAddress(coinType: CoinType): string;
  getAllDeveloperWallets(): Map<CoinType, string>;
  updateDeveloperWallet(coinType: CoinType, address: string): FeeManager;
  updateAllDeveloperWallets(wallets: Map<CoinType, string>): FeeManager;
}

export interface PaymentInterface {
  getBalance(address: string): Promise<string>;
  send(toAddress: string, amount: string): Promise<Transaction>;
  getFeeEstimate(toAddress: string, amount: string): Promise<string>;
}

export interface FreetimePaymentSDK {
  createWallet(coinType: CoinType, name?: string): Wallet;
  getBalance(address: string): Promise<string>;
  send(fromAddress: string, toAddress: string, amount: string, coinType: CoinType): Promise<TransactionWithFees>;
  getFeeEstimate(fromAddress: string, toAddress: string, amount: string, coinType: CoinType): Promise<string>;
  getFeeManager(): FeeManager;
  getAllWallets(): Wallet[];
  getWalletsByCoinType(coinType: CoinType): Wallet[];
  validateAddress(address: string, coinType: CoinType): boolean;
}
