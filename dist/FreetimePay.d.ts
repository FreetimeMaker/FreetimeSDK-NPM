import { DeveloperConfig } from './DeveloperConfig';
import { PaymentProvider } from './PaymentProvider';
import { PaymentRequest, PaymentResult } from './PaymentModels';
/**
 * The main entry point for the Freetime SDK.
 */
export declare class FreetimePay {
    readonly config: DeveloperConfig;
    private readonly providers;
    constructor(config: DeveloperConfig);
    /**
     * Registers a payment provider.
     */
    registerProvider(provider: PaymentProvider): void;
    /**
     * Registers all default major cryptocurrency providers.
     * @param addresses A map of currency codes ("BTC", "ETH", "DOGE", etc.) to recipient addresses.
     */
    registerDefaultCryptoProviders(addresses: Record<string, string>): void;
    /**
     * Returns the list of available providers.
     */
    getAvailableProviders(): PaymentProvider[];
    /**
     * Processes a payment with the selected provider.
     */
    processPayment(providerName: string, request: PaymentRequest, onResult: (result: PaymentResult) => void): void;
    /**
     * Shows a payment selection interface (CLI-based for Node.js).
     * In a browser environment, this would show a UI.
     */
    showPaymentSheet(_request: PaymentRequest): Promise<PaymentResult>;
}
//# sourceMappingURL=FreetimePay.d.ts.map