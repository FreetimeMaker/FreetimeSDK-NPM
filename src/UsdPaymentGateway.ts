import { CoinType, PaymentStatus, getCoinSymbol, Wallet } from './types';
import { ExternalWalletManager, UsdPaymentRequestWithWalletSelection, ExternalWalletApp } from './ExternalWalletIntegration';
import BN from 'bn.js';

/**
 * Enhanced Payment Gateway with USD support and automatic crypto conversion
 */
export class UsdPaymentGateway {
    private pendingPayments = new Map<string, UsdPaymentRequest>();
    private confirmedPayments = new Map<string, ConfirmedUsdPayment>();
    
    constructor(
        private readonly merchantWalletAddress: string,
        private readonly merchantCoinType: CoinType,
        private readonly currencyConverter: CurrencyConverter = new CurrencyConverter(),
        private readonly externalWalletManager: ExternalWalletManager = new ExternalWalletManager()
    ) {}
    
    /**
     * Create a payment request in USD - automatically converts to crypto
     */
    async createUsdPaymentRequest(
        usdAmount: BN,
        customerReference?: string,
        description?: string,
        providedWallet?: Wallet,
        forwardToAddress?: string
    ): Promise<UsdPaymentRequest> {
        
        // Convert USD to target cryptocurrency
        const conversionResult = await this.currencyConverter.convertUsdToCrypto(usdAmount, this.merchantCoinType);
        
        if (!conversionResult.success) {
            throw new Error(`Currency conversion failed: ${conversionResult.error}`);
        }
        
        // Create crypto payment request (simplified version)
        const cryptoPaymentRequest = {
            id: this.generateCryptoPaymentId(),
            customerAddress: this.generateCustomerAddress(),
            merchantAddress: this.merchantWalletAddress,
            amount: conversionResult.cryptoAmount!,
            coinType: this.merchantCoinType,
            customerReference,
            description,
            status: PaymentStatus.PENDING,
            createdAt: Date.now(),
            expiresAt: Date.now() + this.PAYMENT_TIMEOUT
        };
        
        const usdPaymentRequest = new UsdPaymentRequest(
            this.generatePaymentId(),
            cryptoPaymentRequest.customerAddress,
            this.merchantWalletAddress,
            usdAmount,
            conversionResult.cryptoAmount!,
            this.merchantCoinType,
            conversionResult.exchangeRate!,
            Date.now(),
            Date.now() + this.PAYMENT_TIMEOUT,
            cryptoPaymentRequest,
            customerReference,
            description,
            PaymentStatus.PENDING
        );
        
        this.pendingPayments.set(usdPaymentRequest.id, usdPaymentRequest);
        return usdPaymentRequest;
    }
    
    /**
     * Check payment status with USD tracking
     */
    async checkUsdPaymentStatus(paymentId: string): Promise<PaymentStatus> {
        const usdPayment = this.pendingPayments.get(paymentId);
        if (!usdPayment) {
            return PaymentStatus.NOT_FOUND;
        }
        
        // Check if payment is expired
        if (Date.now() > usdPayment.expiresAt) {
            this.pendingPayments.delete(paymentId);
            return PaymentStatus.EXPIRED;
        }
        
        // In a real implementation, this would check the blockchain
        // For now, we'll simulate the check
        const cryptoStatus = await this.checkCryptoPaymentStatus(usdPayment.cryptoPaymentRequest.id);
        
        if (cryptoStatus === PaymentStatus.CONFIRMED) {
            // Simulate confirmed payment
            const confirmedPayment = new ConfirmedUsdPayment(
                usdPayment,
                usdPayment.usdAmount,
                usdPayment.cryptoAmount,
                usdPayment.exchangeRate,
                Date.now(),
                `tx_${Date.now()}`
            );
            
            this.confirmedPayments.set(paymentId, confirmedPayment);
            this.pendingPayments.delete(paymentId);
            
            return PaymentStatus.CONFIRMED;
        }
        
        return cryptoStatus;
    }
    
    /**
     * Get USD payment details
     */
    getUsdPaymentDetails(paymentId: string): UsdPaymentDetails | null {
        const pending = this.pendingPayments.get(paymentId);
        if (pending) {
            return new UsdPaymentDetails(
                pending,
                pending.cryptoAmount.mul(new BN(5000)).div(new BN(10000)), // Simulate partial payment
                pending.cryptoAmount.mul(new BN(5000)).div(new BN(10000)),
                pending.usdAmount.mul(new BN(5000)).div(new BN(10000)),
                pending.usdAmount.mul(new BN(5000)).div(new BN(10000))
            );
        }
        
        const confirmed = this.confirmedPayments.get(paymentId);
        if (confirmed) {
            return new UsdPaymentDetails(
                confirmed.usdPaymentRequest,
                confirmed.receivedCryptoAmount,
                new BN(0),
                confirmed.receivedUsdAmount,
                new BN(0),
                confirmed.forwardedTxHash,
                confirmed.confirmedAt
            );
        }
        
        return null;
    }
    
    /**
     * Get current exchange rates
     */
    async getCurrentExchangeRates(): Promise<Map<CoinType, BN>> {
        return await this.currencyConverter.getAllExchangeRates();
    }
    
    /**
     * Cancel pending payment
     */
    cancelUsdPayment(paymentId: string): boolean {
        return this.pendingPayments.delete(paymentId);
    }
    
    /**
     * Get all pending USD payments
     */
    getPendingUsdPayments(): UsdPaymentRequest[] {
        return Array.from(this.pendingPayments.values());
    }
    
    /**
     * Get all confirmed USD payments
     */
    getConfirmedUsdPayments(): ConfirmedUsdPayment[] {
        return Array.from(this.confirmedPayments.values());
    }
    
    /**
     * Create USD payment request with external wallet selection
     */
    async createUsdPaymentWithWalletSelection(
        usdAmount: BN,
        customerReference?: string,
        description?: string,
        providedWallet?: Wallet,
        forwardToAddress?: string
    ): Promise<UsdPaymentRequestWithWalletSelection> {
        
        // Create base USD payment request
        const usdPaymentRequest = await this.createUsdPaymentRequest(
            usdAmount,
            customerReference,
            description,
            providedWallet,
            forwardToAddress
        );
        
        // Create payment with wallet selection
        return this.externalWalletManager.createPaymentWithWalletSelection(
            usdPaymentRequest,
            this.merchantCoinType
        );
    }
    
    /**
     * Get available external wallet apps for this cryptocurrency
     */
    getAvailableWalletApps(): ExternalWalletApp[] {
        return this.externalWalletManager.getWalletsForCryptocurrency(this.merchantCoinType);
    }
    
    /**
     * Generate payment deep link for specific wallet app
     */
    generatePaymentDeepLink(
        walletApp: ExternalWalletApp,
        usdPaymentRequest: UsdPaymentRequest
    ): string {
        return this.externalWalletManager.generatePaymentDeepLink(
            walletApp,
            usdPaymentRequest.customerAddress,
            usdPaymentRequest.cryptoAmount,
            usdPaymentRequest.coinType
        );
    }
    
    /**
     * Check if specific wallet app supports this cryptocurrency
     */
    isWalletSupported(walletApp: ExternalWalletApp): boolean {
        return this.externalWalletManager.isCoinSupported(walletApp, this.merchantCoinType);
    }
    
    /**
     * Get all supported external wallet apps
     */
    getAllSupportedWalletApps(): ExternalWalletApp[] {
        return this.externalWalletManager.getAllSupportedWallets();
    }
    
    private generatePaymentId(): string {
        return `usd_pay_${Date.now()}_${Math.floor(Math.random() * 9000) + 1000}`;
    }
    
    private generateCryptoPaymentId(): string {
        return `crypto_pay_${Date.now()}_${Math.floor(Math.random() * 9000) + 1000}`;
    }
    
    private generateCustomerAddress(): string {
        // In a real implementation, this would generate a proper address
        return `addr_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    }
    
    private async checkCryptoPaymentStatus(paymentId: string): Promise<PaymentStatus> {
        // In a real implementation, this would check the blockchain
        // For now, we'll simulate the check
        return PaymentStatus.PENDING;
    }
    
    private readonly PAYMENT_TIMEOUT = 30 * 60 * 1000; // 30 minutes
}

/**
 * Payment request with USD amount and automatic crypto conversion
 */
export class UsdPaymentRequest {
    constructor(
        public readonly id: string,
        public readonly customerAddress: string,
        public readonly merchantAddress: string,
        public readonly usdAmount: BN,
        public readonly cryptoAmount: BN,
        public readonly coinType: CoinType,
        public readonly exchangeRate: BN,
        public readonly createdAt: number,
        public readonly expiresAt: number,
        public readonly cryptoPaymentRequest: any,
        public readonly customerReference?: string,
        public readonly description?: string,
        public status: PaymentStatus = PaymentStatus.PENDING,
        public readonly metadata: Map<string, string> = new Map(),
        public readonly feeAmount: BN = new BN(0),
        public readonly totalUsdAmount: BN = usdAmount
    ) {}

    /**
     * Get formatted payment info
     */
    getFormattedInfo(): string {
        const usdFormatted = `$${(this.usdAmount.toNumber() / 100).toFixed(2)}`;
        const cryptoFormatted = `${this.cryptoAmount.toString()} ${getCoinSymbol(this.coinType)}`;
        const rateFormatted = `$${(this.exchangeRate.toNumber() / 100).toFixed(2)}`;
        return `${usdFormatted} USD = ${cryptoFormatted} (Rate: ${rateFormatted})`;
    }
}

/**
 * Confirmed USD payment with final amounts
 */
export class ConfirmedUsdPayment {
    constructor(
        public readonly usdPaymentRequest: UsdPaymentRequest,
        public readonly receivedUsdAmount: BN,
        public readonly receivedCryptoAmount: BN,
        public readonly exchangeRate: BN,
        public readonly confirmedAt: number,
        public readonly forwardedTxHash?: string,
        public readonly processingFee: BN = new BN(0)
    ) {}
}

/**
 * Detailed USD payment information
 */
export class UsdPaymentDetails {
    constructor(
        public readonly usdPaymentRequest: UsdPaymentRequest,
        public readonly currentCryptoBalance: BN,
        public readonly remainingCryptoAmount: BN,
        public readonly currentUsdValue: BN,
        public readonly remainingUsdValue: BN,
        public readonly forwardedTxHash?: string,
        public readonly confirmedAt?: number,
        public readonly processingFee: BN = new BN(0)
    ) {}
}

/**
 * Currency converter for USD to crypto conversion
 */
export class CurrencyConverter {
    private exchangeRates = new Map<CoinType, BN>();
    
    constructor() {
        // Initialize with mock exchange rates
        this.initializeMockRates();
    }
    
    async convertUsdToCrypto(usdAmount: BN, coinType: CoinType): Promise<CurrencyConversionResult> {
        const exchangeRate = this.exchangeRates.get(coinType);
        if (!exchangeRate) {
            return {
                success: false,
                error: `No exchange rate available for ${getCoinSymbol(coinType)}`
            };
        }
        
        // Convert USD cents to crypto units
        const cryptoAmount = usdAmount.mul(new BN(10000)).div(exchangeRate);
        
        return {
            success: true,
            cryptoAmount,
            exchangeRate
        };
    }
    
    async convertCryptoToUsd(cryptoAmount: BN, coinType: CoinType): Promise<CurrencyConversionResult> {
        const exchangeRate = this.exchangeRates.get(coinType);
        if (!exchangeRate) {
            return {
                success: false,
                error: `No exchange rate available for ${getCoinSymbol(coinType)}`
            };
        }
        
        // Convert crypto units to USD cents
        const usdAmount = cryptoAmount.mul(exchangeRate).div(new BN(10000));
        
        return {
            success: true,
            usdAmount,
            exchangeRate
        };
    }
    
    async getAllExchangeRates(): Promise<Map<CoinType, BN>> {
        return new Map(this.exchangeRates);
    }
    
    private initializeMockRates(): void {
        // Mock exchange rates (1 USD = X crypto, stored as basis points)
        this.exchangeRates.set(CoinType.BITCOIN, new BN("4300000")); // 0.000043 BTC per USD
        this.exchangeRates.set(CoinType.ETHEREUM, new BN("650000")); // 0.00065 ETH per USD
        this.exchangeRates.set(CoinType.LITECOIN, new BN("18000000")); // 0.018 LTC per USD
        this.exchangeRates.set(CoinType.BITCOIN_CASH, new BN("4200000")); // 0.0042 BCH per USD
        this.exchangeRates.set(CoinType.DOGECOIN, new BN("650000000")); // 6.5 DOGE per USD
        this.exchangeRates.set(CoinType.POLYGON, new BN("180000000")); // 1.8 MATIC per USD
        this.exchangeRates.set(CoinType.BINANCE_COIN, new BN("3800000")); // 0.0038 BNB per USD
        this.exchangeRates.set(CoinType.SOLANA, new BN("14000000")); // 0.014 SOL per USD
        this.exchangeRates.set(CoinType.TRON, new BN("420000000")); // 4.2 TRX per USD
    }
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
