import { CoinType, PaymentStatus, Wallet } from './types';
import { ExternalWalletManager, UsdPaymentRequestWithWalletSelection, ExternalWalletApp } from './ExternalWalletIntegration';
import BN from 'bn.js';
/**
 * Enhanced Payment Gateway with USD support and automatic crypto conversion
 */
export declare class UsdPaymentGateway {
    private readonly merchantWalletAddress;
    private readonly merchantCoinType;
    private readonly currencyConverter;
    private readonly externalWalletManager;
    private pendingPayments;
    private confirmedPayments;
    constructor(merchantWalletAddress: string, merchantCoinType: CoinType, currencyConverter?: CurrencyConverter, externalWalletManager?: ExternalWalletManager);
    /**
     * Create a payment request in USD - automatically converts to crypto
     */
    createUsdPaymentRequest(usdAmount: BN, customerReference?: string, description?: string, providedWallet?: Wallet, forwardToAddress?: string): Promise<UsdPaymentRequest>;
    /**
     * Check payment status with USD tracking
     */
    checkUsdPaymentStatus(paymentId: string): Promise<PaymentStatus>;
    /**
     * Get USD payment details
     */
    getUsdPaymentDetails(paymentId: string): UsdPaymentDetails | null;
    /**
     * Get current exchange rates
     */
    getCurrentExchangeRates(): Promise<Map<CoinType, BN>>;
    /**
     * Cancel pending payment
     */
    cancelUsdPayment(paymentId: string): boolean;
    /**
     * Get all pending USD payments
     */
    getPendingUsdPayments(): UsdPaymentRequest[];
    /**
     * Get all confirmed USD payments
     */
    getConfirmedUsdPayments(): ConfirmedUsdPayment[];
    /**
     * Create USD payment request with external wallet selection
     */
    createUsdPaymentWithWalletSelection(usdAmount: BN, customerReference?: string, description?: string, providedWallet?: Wallet, forwardToAddress?: string): Promise<UsdPaymentRequestWithWalletSelection>;
    /**
     * Get available external wallet apps for this cryptocurrency
     */
    getAvailableWalletApps(): ExternalWalletApp[];
    /**
     * Generate payment deep link for specific wallet app
     */
    generatePaymentDeepLink(walletApp: ExternalWalletApp, usdPaymentRequest: UsdPaymentRequest): string;
    /**
     * Check if specific wallet app supports this cryptocurrency
     */
    isWalletSupported(walletApp: ExternalWalletApp): boolean;
    /**
     * Get all supported external wallet apps
     */
    getAllSupportedWalletApps(): ExternalWalletApp[];
    private generatePaymentId;
    private generateCryptoPaymentId;
    private generateCustomerAddress;
    private checkCryptoPaymentStatus;
    private readonly PAYMENT_TIMEOUT;
}
/**
 * Payment request with USD amount and automatic crypto conversion
 */
export declare class UsdPaymentRequest {
    readonly id: string;
    readonly customerAddress: string;
    readonly merchantAddress: string;
    readonly usdAmount: BN;
    readonly cryptoAmount: BN;
    readonly coinType: CoinType;
    readonly exchangeRate: BN;
    readonly createdAt: number;
    readonly expiresAt: number;
    readonly cryptoPaymentRequest: any;
    readonly customerReference?: string | undefined;
    readonly description?: string | undefined;
    status: PaymentStatus;
    readonly metadata: Map<string, string>;
    readonly feeAmount: BN;
    readonly totalUsdAmount: BN;
    constructor(id: string, customerAddress: string, merchantAddress: string, usdAmount: BN, cryptoAmount: BN, coinType: CoinType, exchangeRate: BN, createdAt: number, expiresAt: number, cryptoPaymentRequest: any, customerReference?: string | undefined, description?: string | undefined, status?: PaymentStatus, metadata?: Map<string, string>, feeAmount?: BN, totalUsdAmount?: BN);
    /**
     * Get formatted payment info
     */
    getFormattedInfo(): string;
}
/**
 * Confirmed USD payment with final amounts
 */
export declare class ConfirmedUsdPayment {
    readonly usdPaymentRequest: UsdPaymentRequest;
    readonly receivedUsdAmount: BN;
    readonly receivedCryptoAmount: BN;
    readonly exchangeRate: BN;
    readonly confirmedAt: number;
    readonly forwardedTxHash?: string | undefined;
    readonly processingFee: BN;
    constructor(usdPaymentRequest: UsdPaymentRequest, receivedUsdAmount: BN, receivedCryptoAmount: BN, exchangeRate: BN, confirmedAt: number, forwardedTxHash?: string | undefined, processingFee?: BN);
}
/**
 * Detailed USD payment information
 */
export declare class UsdPaymentDetails {
    readonly usdPaymentRequest: UsdPaymentRequest;
    readonly currentCryptoBalance: BN;
    readonly remainingCryptoAmount: BN;
    readonly currentUsdValue: BN;
    readonly remainingUsdValue: BN;
    readonly forwardedTxHash?: string | undefined;
    readonly confirmedAt?: number | undefined;
    readonly processingFee: BN;
    constructor(usdPaymentRequest: UsdPaymentRequest, currentCryptoBalance: BN, remainingCryptoAmount: BN, currentUsdValue: BN, remainingUsdValue: BN, forwardedTxHash?: string | undefined, confirmedAt?: number | undefined, processingFee?: BN);
}
/**
 * Currency converter for USD to crypto conversion
 */
export declare class CurrencyConverter {
    private exchangeRates;
    constructor();
    convertUsdToCrypto(usdAmount: BN, coinType: CoinType): Promise<CurrencyConversionResult>;
    convertCryptoToUsd(cryptoAmount: BN, coinType: CoinType): Promise<CurrencyConversionResult>;
    getAllExchangeRates(): Promise<Map<CoinType, BN>>;
    private initializeMockRates;
}
/**
 * Currency conversion result
 */
export interface CurrencyConversionResult {
    success: boolean;
    cryptoAmount?: BN;
    usdAmount?: BN;
    exchangeRate?: BN;
    error?: string;
}
//# sourceMappingURL=UsdPaymentGateway.d.ts.map