import { PaymentProvider } from '../PaymentProvider';
import { PaymentRequest, PaymentResult, PaymentResultSuccess, PaymentResultError } from '../PaymentModels';

/**
 * Ethereum (ETH) Provider.
 * Uses the 'ethereum:' URI scheme (ERC-681).
 */
export class EthereumProvider implements PaymentProvider {
    readonly name = 'Ethereum (ETH)';

    constructor(private readonly recipientAddress: string) {}

    processPayment(request: PaymentRequest, onResult: (result: PaymentResult) => void): void {
        try {
            // Ethereum ERC-681 format: ethereum:address@chainId?value=amount
            const uri = `ethereum:${this.recipientAddress}@1?value=${request.amount}`;
            console.log(`Ethereum Payment URI: ${uri}`);
            
            // For web environments
            if (typeof window !== 'undefined' && window.open) {
                window.open(uri, '_blank');
                onResult(new PaymentResultSuccess('ethereum_intent_launched', request.amount));
            } else {
                // For Node.js CLI environment
                onResult(new PaymentResultSuccess('ethereum_uri_generated', request.amount));
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            onResult(new PaymentResultError(`Ethereum payment failed: ${errorMessage}`));
        }
    }

    /**
     * Gets the Ethereum URI for a payment request.
     */
    getPaymentUri(request: PaymentRequest): string {
        return `ethereum:${this.recipientAddress}@1?value=${request.amount}`;
    }
}