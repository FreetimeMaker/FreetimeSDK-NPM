import { PaymentProvider } from '../PaymentProvider';
import { PaymentRequest, PaymentResult, PaymentResultSuccess, PaymentResultError } from '../PaymentModels';

/**
 * Base class for cryptocurrency providers that use URI schemes.
 */
export abstract class CryptoProviderBase implements PaymentProvider {
    constructor(protected readonly recipientAddress: string) {}

    abstract readonly name: string;
    abstract getUriScheme(): string;
    abstract getUriParameters(request: PaymentRequest): string;

    processPayment(request: PaymentRequest, onResult: (result: PaymentResult) => void): void {
        try {
            const uri = this.getPaymentUri(request);
            console.log(`${this.name} Payment URI: ${uri}`);
            
            // For web environments
            if (typeof window !== 'undefined' && window.open) {
                window.open(uri, '_blank');
                onResult(new PaymentResultSuccess(`${this.name.toLowerCase().replace(/\s/g, '_')}_intent_launched`, request.amount));
            } else {
                // For Node.js CLI environment
                onResult(new PaymentResultSuccess(`${this.name.toLowerCase().replace(/\s/g, '_')}_uri_generated`, request.amount));
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            onResult(new PaymentResultError(`${this.name} payment failed: ${errorMessage}`));
        }
    }

    getPaymentUri(request: PaymentRequest): string {
        return `${this.getUriScheme()}${this.recipientAddress}${this.getUriParameters(request)}`;
    }
}