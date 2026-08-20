import { PaymentRequest, PaymentResult } from './types';

/**
 * Interface for all payment providers.
 * Aligned with Android PaymentProvider interface.
 */
export interface PaymentProvider {
  readonly name: string;

  /**
   * Initiates the payment process.
   * @param request The payment request details.
   * @param onResult Callback for the result.
   */
  processPayment(
    request: PaymentRequest,
    onResult: (result: PaymentResult) => void
  ): void;
}
