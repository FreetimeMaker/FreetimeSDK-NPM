import { 
  CoinType, 
  Wallet, 
  Transaction, 
  TransactionWithFees, 
  FeeManager, 
  PaymentInterface,
  FreetimePaymentSDK as IFreetimePaymentSDK 
} from './types';
import { WalletImpl } from './Wallet';
import { TransactionImpl, TransactionWithFeesImpl } from './Transaction';
import { FeeManagerImpl } from './FeeManager';
import { FeeBreakdownImpl } from './FeeBreakdown';
import { CryptoUtils } from './CryptoUtils';
import { GameIntegration } from './GameIntegration';
import { UserWalletManager } from './UserWalletConfig';
import { HealthMonitor } from './HealthMonitor';
import { StatisticsManager } from './StatisticsManager';
import { TransactionQueue } from './TransactionQueue';

export class FreetimePaymentSDK implements IFreetimePaymentSDK {
  private wallets: Wallet[] = [];
  private feeManager: FeeManager;
  private paymentProviders: Map<CoinType, PaymentInterface> = new Map();
  public gameIntegration: GameIntegration;
  public userWalletManager: UserWalletManager;
  private healthMonitor: HealthMonitor;
  private statisticsManager: StatisticsManager;
  private transactionQueue: TransactionQueue;

  constructor() {
    this.feeManager = new FeeManagerImpl();
    this.gameIntegration = new GameIntegration();
    this.userWalletManager = new UserWalletManager();
    this.healthMonitor = new HealthMonitor();
    this.statisticsManager = new StatisticsManager();
    this.transactionQueue = new TransactionQueue();
    this.initializePaymentProviders();
    this.healthMonitor.startPassiveMonitoring();
  }

  private initializePaymentProviders(): void {
    for (const coinType of Object.values(CoinType)) {
      this.paymentProviders.set(coinType, new MockPaymentProvider(coinType));
    }
  }

  createWallet(coinType: CoinType, name?: string): Wallet {
    const wallet = WalletImpl.create(coinType, name);
    this.wallets.push(wallet);
    return wallet;
  }

  async getBalance(address: string): Promise<string> {
    const wallet = this.wallets.find(w => w.address === address);
    if (!wallet) {
      throw new Error(`Wallet not found for address: ${address}`);
    }
    
    const provider = this.paymentProviders.get(wallet.coinType);
    if (!provider) {
      throw new Error(`Payment provider not found for ${wallet.coinType}`);
    }
    
    return await provider.getBalance(address);
  }

  async send(
    fromAddress: string, 
    toAddress: string, 
    amount: string, 
    coinType: CoinType
  ): Promise<TransactionWithFees> {
    const fromWallet = this.wallets.find(w => w.address === fromAddress);
    if (!fromWallet) {
      throw new Error(`Source wallet not found: ${fromAddress}`);
    }

    if (!this.validateAddress(toAddress, coinType)) {
      throw new Error(`Invalid recipient address: ${toAddress}`);
    }

    const provider = this.paymentProviders.get(coinType);
    if (!provider) {
      throw new Error(`Payment provider not found for ${coinType}`);
    }

    const networkFee = await provider.getFeeEstimate(toAddress, amount);
    const developerFeePercentage = this.feeManager.getDeveloperFeePercentage(amount);
    const developerFee = (parseFloat(amount) * parseFloat(developerFeePercentage) / 100).toString();
    const totalFee = (parseFloat(networkFee) + parseFloat(developerFee)).toString();
    const recipientReceives = (parseFloat(amount) - parseFloat(totalFee)).toString();

    const feeBreakdown = new FeeBreakdownImpl(
      amount,
      networkFee,
      developerFee,
      developerFeePercentage,
      totalFee,
      recipientReceives,
      this.feeManager.getDeveloperWalletAddress(coinType),
      coinType
    );

    const transaction = new TransactionImpl(
      CryptoUtils.generateTransactionHash(),
      fromAddress,
      toAddress,
      recipientReceives,
      totalFee,
      coinType
    );

    return new TransactionWithFeesImpl(transaction, feeBreakdown, this.transactionQueue);
  }

  async getFeeEstimate(
    fromAddress: string, 
    toAddress: string, 
    amount: string, 
    coinType: CoinType
  ): Promise<string> {
    const provider = this.paymentProviders.get(coinType);
    if (!provider) {
      throw new Error(`Payment provider not found for ${coinType}`);
    }

    const networkFee = await provider.getFeeEstimate(toAddress, amount);
    const developerFeePercentage = this.feeManager.getDeveloperFeePercentage(amount);
    const developerFee = (parseFloat(amount) * parseFloat(developerFeePercentage) / 100).toString();
    
    return (parseFloat(networkFee) + parseFloat(developerFee)).toString();
  }

  getFeeManager(): FeeManager {
    return this.feeManager;
  }

  getHealthMonitor(): HealthMonitor {
    return this.healthMonitor;
  }

  getStatisticsManager(): StatisticsManager {
    return this.statisticsManager;
  }

  getTransactionQueue(): TransactionQueue {
    return this.transactionQueue;
  }

  getAllWallets(): Wallet[] {
    return [...this.wallets];
  }

  getWalletsByCoinType(coinType: CoinType): Wallet[] {
    return this.wallets.filter(w => w.coinType === coinType);
  }

  validateAddress(address: string, coinType: CoinType): boolean {
    return CryptoUtils.validateAddress(address, coinType);
  }
}

class MockPaymentProvider implements PaymentInterface {
  constructor(private coinType: CoinType) {}

  async getBalance(address: string): Promise<string> {
    return (Math.random() * 10).toFixed(8);
  }

  async send(toAddress: string, amount: string): Promise<Transaction> {
    return new TransactionImpl(
      CryptoUtils.generateTransactionHash(),
      'mock-from-address',
      toAddress,
      amount,
      '0.0001',
      this.coinType
    );
  }

  async getFeeEstimate(toAddress: string, amount: string): Promise<string> {
    return (Math.random() * 0.001).toFixed(8);
  }
}
