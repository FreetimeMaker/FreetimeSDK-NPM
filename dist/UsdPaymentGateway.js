"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyConverter = exports.UsdPaymentDetails = exports.ConfirmedUsdPayment = exports.UsdPaymentRequest = exports.UsdPaymentGateway = void 0;
const types_1 = require("./types");
const ExternalWalletIntegration_1 = require("./ExternalWalletIntegration");
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * Enhanced Payment Gateway with USD support and automatic crypto conversion
 */
class UsdPaymentGateway {
    constructor(merchantWalletAddress, merchantCoinType, currencyConverter = new CurrencyConverter(), externalWalletManager = new ExternalWalletIntegration_1.ExternalWalletManager()) {
        this.merchantWalletAddress = merchantWalletAddress;
        this.merchantCoinType = merchantCoinType;
        this.currencyConverter = currencyConverter;
        this.externalWalletManager = externalWalletManager;
        this.pendingPayments = new Map();
        this.confirmedPayments = new Map();
        this.PAYMENT_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    }
    /**
     * Create a payment request in USD - automatically converts to crypto
     */
    async createUsdPaymentRequest(usdAmount, customerReference, description, providedWallet, forwardToAddress) {
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
            amount: conversionResult.cryptoAmount,
            coinType: this.merchantCoinType,
            customerReference,
            description,
            status: types_1.PaymentStatus.PENDING,
            createdAt: Date.now(),
            expiresAt: Date.now() + this.PAYMENT_TIMEOUT
        };
        const usdPaymentRequest = new UsdPaymentRequest(this.generatePaymentId(), cryptoPaymentRequest.customerAddress, this.merchantWalletAddress, usdAmount, conversionResult.cryptoAmount, this.merchantCoinType, conversionResult.exchangeRate, Date.now(), Date.now() + this.PAYMENT_TIMEOUT, cryptoPaymentRequest, customerReference, description, types_1.PaymentStatus.PENDING);
        this.pendingPayments.set(usdPaymentRequest.id, usdPaymentRequest);
        return usdPaymentRequest;
    }
    /**
     * Check payment status with USD tracking
     */
    async checkUsdPaymentStatus(paymentId) {
        const usdPayment = this.pendingPayments.get(paymentId);
        if (!usdPayment) {
            return types_1.PaymentStatus.NOT_FOUND;
        }
        // Check if payment is expired
        if (Date.now() > usdPayment.expiresAt) {
            this.pendingPayments.delete(paymentId);
            return types_1.PaymentStatus.EXPIRED;
        }
        // In a real implementation, this would check the blockchain
        // For now, we'll simulate the check
        const cryptoStatus = await this.checkCryptoPaymentStatus(usdPayment.cryptoPaymentRequest.id);
        if (cryptoStatus === types_1.PaymentStatus.CONFIRMED) {
            // Simulate confirmed payment
            const confirmedPayment = new ConfirmedUsdPayment(usdPayment, usdPayment.usdAmount, usdPayment.cryptoAmount, usdPayment.exchangeRate, Date.now(), `tx_${Date.now()}`);
            this.confirmedPayments.set(paymentId, confirmedPayment);
            this.pendingPayments.delete(paymentId);
            return types_1.PaymentStatus.CONFIRMED;
        }
        return cryptoStatus;
    }
    /**
     * Get USD payment details
     */
    getUsdPaymentDetails(paymentId) {
        const pending = this.pendingPayments.get(paymentId);
        if (pending) {
            return new UsdPaymentDetails(pending, pending.cryptoAmount.mul(new bn_js_1.default(5000)).div(new bn_js_1.default(10000)), // Simulate partial payment
            pending.cryptoAmount.mul(new bn_js_1.default(5000)).div(new bn_js_1.default(10000)), pending.usdAmount.mul(new bn_js_1.default(5000)).div(new bn_js_1.default(10000)), pending.usdAmount.mul(new bn_js_1.default(5000)).div(new bn_js_1.default(10000)));
        }
        const confirmed = this.confirmedPayments.get(paymentId);
        if (confirmed) {
            return new UsdPaymentDetails(confirmed.usdPaymentRequest, confirmed.receivedCryptoAmount, new bn_js_1.default(0), confirmed.receivedUsdAmount, new bn_js_1.default(0), confirmed.forwardedTxHash, confirmed.confirmedAt);
        }
        return null;
    }
    /**
     * Get current exchange rates
     */
    async getCurrentExchangeRates() {
        return await this.currencyConverter.getAllExchangeRates();
    }
    /**
     * Cancel pending payment
     */
    cancelUsdPayment(paymentId) {
        return this.pendingPayments.delete(paymentId);
    }
    /**
     * Get all pending USD payments
     */
    getPendingUsdPayments() {
        return Array.from(this.pendingPayments.values());
    }
    /**
     * Get all confirmed USD payments
     */
    getConfirmedUsdPayments() {
        return Array.from(this.confirmedPayments.values());
    }
    /**
     * Create USD payment request with external wallet selection
     */
    async createUsdPaymentWithWalletSelection(usdAmount, customerReference, description, providedWallet, forwardToAddress) {
        // Create base USD payment request
        const usdPaymentRequest = await this.createUsdPaymentRequest(usdAmount, customerReference, description, providedWallet, forwardToAddress);
        // Create payment with wallet selection
        return this.externalWalletManager.createPaymentWithWalletSelection(usdPaymentRequest, this.merchantCoinType);
    }
    /**
     * Get available external wallet apps for this cryptocurrency
     */
    getAvailableWalletApps() {
        return this.externalWalletManager.getWalletsForCryptocurrency(this.merchantCoinType);
    }
    /**
     * Generate payment deep link for specific wallet app
     */
    generatePaymentDeepLink(walletApp, usdPaymentRequest) {
        return this.externalWalletManager.generatePaymentDeepLink(walletApp, usdPaymentRequest.customerAddress, usdPaymentRequest.cryptoAmount, usdPaymentRequest.coinType);
    }
    /**
     * Check if specific wallet app supports this cryptocurrency
     */
    isWalletSupported(walletApp) {
        return this.externalWalletManager.isCoinSupported(walletApp, this.merchantCoinType);
    }
    /**
     * Get all supported external wallet apps
     */
    getAllSupportedWalletApps() {
        return this.externalWalletManager.getAllSupportedWallets();
    }
    generatePaymentId() {
        return `usd_pay_${Date.now()}_${Math.floor(Math.random() * 9000) + 1000}`;
    }
    generateCryptoPaymentId() {
        return `crypto_pay_${Date.now()}_${Math.floor(Math.random() * 9000) + 1000}`;
    }
    generateCustomerAddress() {
        // In a real implementation, this would generate a proper address
        return `addr_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    }
    async checkCryptoPaymentStatus(paymentId) {
        // In a real implementation, this would check the blockchain
        // For now, we'll simulate the check
        return types_1.PaymentStatus.PENDING;
    }
}
exports.UsdPaymentGateway = UsdPaymentGateway;
/**
 * Payment request with USD amount and automatic crypto conversion
 */
class UsdPaymentRequest {
    constructor(id, customerAddress, merchantAddress, usdAmount, cryptoAmount, coinType, exchangeRate, createdAt, expiresAt, cryptoPaymentRequest, customerReference, description, status = types_1.PaymentStatus.PENDING, metadata = new Map(), feeAmount = new bn_js_1.default(0), totalUsdAmount = usdAmount) {
        this.id = id;
        this.customerAddress = customerAddress;
        this.merchantAddress = merchantAddress;
        this.usdAmount = usdAmount;
        this.cryptoAmount = cryptoAmount;
        this.coinType = coinType;
        this.exchangeRate = exchangeRate;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.cryptoPaymentRequest = cryptoPaymentRequest;
        this.customerReference = customerReference;
        this.description = description;
        this.status = status;
        this.metadata = metadata;
        this.feeAmount = feeAmount;
        this.totalUsdAmount = totalUsdAmount;
    }
    /**
     * Get formatted payment info
     */
    getFormattedInfo() {
        const usdFormatted = `$${(this.usdAmount.toNumber() / 100).toFixed(2)}`;
        const cryptoFormatted = `${this.cryptoAmount.toString()} ${(0, types_1.getCoinSymbol)(this.coinType)}`;
        const rateFormatted = `$${(this.exchangeRate.toNumber() / 100).toFixed(2)}`;
        return `${usdFormatted} USD = ${cryptoFormatted} (Rate: ${rateFormatted})`;
    }
}
exports.UsdPaymentRequest = UsdPaymentRequest;
/**
 * Confirmed USD payment with final amounts
 */
class ConfirmedUsdPayment {
    constructor(usdPaymentRequest, receivedUsdAmount, receivedCryptoAmount, exchangeRate, confirmedAt, forwardedTxHash, processingFee = new bn_js_1.default(0)) {
        this.usdPaymentRequest = usdPaymentRequest;
        this.receivedUsdAmount = receivedUsdAmount;
        this.receivedCryptoAmount = receivedCryptoAmount;
        this.exchangeRate = exchangeRate;
        this.confirmedAt = confirmedAt;
        this.forwardedTxHash = forwardedTxHash;
        this.processingFee = processingFee;
    }
}
exports.ConfirmedUsdPayment = ConfirmedUsdPayment;
/**
 * Detailed USD payment information
 */
class UsdPaymentDetails {
    constructor(usdPaymentRequest, currentCryptoBalance, remainingCryptoAmount, currentUsdValue, remainingUsdValue, forwardedTxHash, confirmedAt, processingFee = new bn_js_1.default(0)) {
        this.usdPaymentRequest = usdPaymentRequest;
        this.currentCryptoBalance = currentCryptoBalance;
        this.remainingCryptoAmount = remainingCryptoAmount;
        this.currentUsdValue = currentUsdValue;
        this.remainingUsdValue = remainingUsdValue;
        this.forwardedTxHash = forwardedTxHash;
        this.confirmedAt = confirmedAt;
        this.processingFee = processingFee;
    }
}
exports.UsdPaymentDetails = UsdPaymentDetails;
/**
 * Currency converter for USD to crypto conversion
 */
class CurrencyConverter {
    constructor() {
        this.exchangeRates = new Map();
        // Initialize with mock exchange rates
        this.initializeMockRates();
    }
    async convertUsdToCrypto(usdAmount, coinType) {
        const exchangeRate = this.exchangeRates.get(coinType);
        if (!exchangeRate) {
            return {
                success: false,
                error: `No exchange rate available for ${(0, types_1.getCoinSymbol)(coinType)}`
            };
        }
        // Convert USD cents to crypto units
        const cryptoAmount = usdAmount.mul(new bn_js_1.default(10000)).div(exchangeRate);
        return {
            success: true,
            cryptoAmount,
            exchangeRate
        };
    }
    async convertCryptoToUsd(cryptoAmount, coinType) {
        const exchangeRate = this.exchangeRates.get(coinType);
        if (!exchangeRate) {
            return {
                success: false,
                error: `No exchange rate available for ${(0, types_1.getCoinSymbol)(coinType)}`
            };
        }
        // Convert crypto units to USD cents
        const usdAmount = cryptoAmount.mul(exchangeRate).div(new bn_js_1.default(10000));
        return {
            success: true,
            usdAmount,
            exchangeRate
        };
    }
    async getAllExchangeRates() {
        return new Map(this.exchangeRates);
    }
    initializeMockRates() {
        // Mock exchange rates (1 USD = X crypto, stored as basis points)
        this.exchangeRates.set(types_1.CoinType.BITCOIN, new bn_js_1.default("4300000")); // 0.000043 BTC per USD
        this.exchangeRates.set(types_1.CoinType.ETHEREUM, new bn_js_1.default("650000")); // 0.00065 ETH per USD
        this.exchangeRates.set(types_1.CoinType.LITECOIN, new bn_js_1.default("18000000")); // 0.018 LTC per USD
        this.exchangeRates.set(types_1.CoinType.BITCOIN_CASH, new bn_js_1.default("4200000")); // 0.0042 BCH per USD
        this.exchangeRates.set(types_1.CoinType.DOGECOIN, new bn_js_1.default("650000000")); // 6.5 DOGE per USD
        this.exchangeRates.set(types_1.CoinType.POLYGON, new bn_js_1.default("180000000")); // 1.8 MATIC per USD
        this.exchangeRates.set(types_1.CoinType.BINANCE_COIN, new bn_js_1.default("3800000")); // 0.0038 BNB per USD
        this.exchangeRates.set(types_1.CoinType.SOLANA, new bn_js_1.default("14000000")); // 0.014 SOL per USD
        this.exchangeRates.set(types_1.CoinType.TRON, new bn_js_1.default("420000000")); // 4.2 TRX per USD
    }
}
exports.CurrencyConverter = CurrencyConverter;
//# sourceMappingURL=UsdPaymentGateway.js.map