export enum CoinType {
  BITCOIN = 'BTC',
  ETHEREUM = 'ETH',
  LITECOIN = 'LTC',
  BITCOIN_CASH = 'BCH',
  DOGECOIN = 'DOGE',
  SOLANA = 'SOL',
  POLYGON = 'MATIC',
  BINANCE_COIN = 'BNB',
  TRON = 'TRX'
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
  [CoinType.TRON]: 'TRX'
};

// Extension to get symbol from CoinType
export function getCoinSymbol(coinType: CoinType): string {
  return COIN_SYMBOLS[coinType];
}

export enum PaymentStatus {
  PENDING = 'pending',
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
  'TRX': CoinType.TRON
};

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
