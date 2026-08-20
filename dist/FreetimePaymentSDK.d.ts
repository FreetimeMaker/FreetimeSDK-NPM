import { CoinType, Wallet, TransactionWithFees, FeeManager, FreetimePaymentSDK as IFreetimePaymentSDK } from './types';
import { GameIntegration } from './GameIntegration';
import { UserWalletManager } from './UserWalletConfig';
import { HealthMonitor } from './HealthMonitor';
import { StatisticsManager } from './StatisticsManager';
export declare class FreetimePaymentSDK implements IFreetimePaymentSDK {
    private wallets;
    private feeManager;
    private paymentProviders;
    gameIntegration: GameIntegration;
    userWalletManager: UserWalletManager;
    private healthMonitor;
    private statisticsManager;
    constructor();
    private initializePaymentProviders;
    createWallet(coinType: CoinType, name?: string): Wallet;
    getBalance(address: string): Promise<string>;
    send(fromAddress: string, toAddress: string, amount: string, coinType: CoinType): Promise<TransactionWithFees>;
    getFeeEstimate(fromAddress: string, toAddress: string, amount: string, coinType: CoinType): Promise<string>;
    getFeeManager(): FeeManager;
    getHealthMonitor(): HealthMonitor;
    getStatisticsManager(): StatisticsManager;
    getAllWallets(): Wallet[];
    getWalletsByCoinType(coinType: CoinType): Wallet[];
    validateAddress(address: string, coinType: CoinType): boolean;
}
//# sourceMappingURL=FreetimePaymentSDK.d.ts.map