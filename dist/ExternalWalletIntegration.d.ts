import { CoinType } from './types';
import BN from 'bn.js';
interface IUsdPaymentRequest {
    customerAddress: string;
    cryptoAmount: BN;
    coinType: CoinType;
    getFormattedInfo(): string;
}
/**
 * External wallet app integration for crypto payments
 */
export declare class ExternalWalletApp {
    readonly name: string;
    readonly packageName: string;
    readonly supportedCoins: CoinType[];
    readonly deepLinkScheme: string;
    readonly iconUrl?: string | undefined;
    constructor(name: string, packageName: string, supportedCoins: CoinType[], deepLinkScheme: string, iconUrl?: string | undefined);
    static readonly TRUST_WALLET: ExternalWalletApp;
    static readonly META_MASK: ExternalWalletApp;
    static readonly COINBASE_WALLET: ExternalWalletApp;
    static readonly BINANCE_WALLET: ExternalWalletApp;
    static readonly EXODUS: ExternalWalletApp;
    static readonly ATOMIC_WALLET: ExternalWalletApp;
    static readonly LEDGER_LIVE: ExternalWalletApp;
    static readonly TREZOR_SUITE: ExternalWalletApp;
    static readonly MYCELIUM: ExternalWalletApp;
    static readonly ELECTRUM: ExternalWalletApp;
    static readonly BRAVE_WALLET: ExternalWalletApp;
    static readonly RAINBOW_WALLET: ExternalWalletApp;
    static readonly WALLET_CONNECT: ExternalWalletApp;
    static readonly PHANTOM_WALLET: ExternalWalletApp;
    static readonly SOLFLARE_WALLET: ExternalWalletApp;
    static readonly TRON_WALLET: ExternalWalletApp;
    static readonly KLEVER_WALLET: ExternalWalletApp;
    static readonly BITKEEP_WALLET: ExternalWalletApp;
    static readonly SAFE_WALLET: ExternalWalletApp;
    static readonly ARGENT_WALLET: ExternalWalletApp;
    static readonly ZERION_WALLET: ExternalWalletApp;
    static readonly IM_TOKEN_WALLET: ExternalWalletApp;
    static readonly MATH_WALLET: ExternalWalletApp;
    static readonly TOKEN_POCKET: ExternalWalletApp;
    static getAllWalletApps(): ExternalWalletApp[];
    static getWalletsForCoin(coinType: CoinType): ExternalWalletApp[];
    /**
     * Generate deep link for payment
     */
    generatePaymentDeepLink(address: string, amount: BN, coinType: CoinType): string;
    /**
     * Check if wallet app is installed (in browser environment, always return true for SDK purposes)
     */
    isInstalled(): boolean;
}
/**
 * Enhanced USD Payment Request with external wallet integration
 */
export declare class UsdPaymentRequestWithWalletSelection {
    readonly usdPaymentRequest: IUsdPaymentRequest;
    readonly availableWalletApps: ExternalWalletApp[];
    readonly selectedWalletApp?: ExternalWalletApp | undefined;
    readonly walletSelectionRequired: boolean;
    constructor(usdPaymentRequest: IUsdPaymentRequest, availableWalletApps: ExternalWalletApp[], selectedWalletApp?: ExternalWalletApp | undefined, walletSelectionRequired?: boolean);
    /**
     * Get payment deep link for selected wallet
     */
    getPaymentDeepLink(): string | null;
    /**
     * Select wallet app
     */
    selectWallet(walletApp: ExternalWalletApp): UsdPaymentRequestWithWalletSelection;
    /**
     * Get formatted payment info with wallet selection
     */
    getFormattedInfo(): string;
}
/**
 * External Wallet Integration Manager
 */
export declare class ExternalWalletManager {
    /**
     * Create payment request with wallet selection
     */
    createPaymentWithWalletSelection(usdPaymentRequest: IUsdPaymentRequest, coinType: CoinType): UsdPaymentRequestWithWalletSelection;
    /**
     * Get all supported wallet apps
     */
    getAllSupportedWallets(): ExternalWalletApp[];
    /**
     * Get wallet apps for specific cryptocurrency
     */
    getWalletsForCryptocurrency(coinType: CoinType): ExternalWalletApp[];
    /**
     * Generate payment deep link
     */
    generatePaymentDeepLink(walletApp: ExternalWalletApp, address: string, amount: BN, coinType: CoinType): string;
    /**
     * Check if wallet app supports specific cryptocurrency
     */
    isCoinSupported(walletApp: ExternalWalletApp, coinType: CoinType): boolean;
    /**
     * Get wallet app by package name
     */
    getWalletByPackageName(packageName: string): ExternalWalletApp | undefined;
}
export {};
//# sourceMappingURL=ExternalWalletIntegration.d.ts.map