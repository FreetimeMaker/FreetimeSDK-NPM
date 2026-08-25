import { PaymentRequest, PaymentResult } from './PaymentModels';

/**
 * Interface for all payment providers.
 */
export interface PaymentProvider {
    readonly name: string;
    
    /**
     * Initiates the payment process.
     * @param request The payment request details.
     * @param onResult Callback for the result.
     */
    processPayment(request: PaymentRequest, onResult: (result: PaymentResult) => void): void;
}