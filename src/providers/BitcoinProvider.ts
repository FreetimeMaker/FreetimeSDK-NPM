import { PaymentProvider } from '../PaymentProvider';
import { PaymentRequest, PaymentResult } from '../types';

/**
 * Bitcoin (BTC) Provider.
 * Uses the 'bitcoin:' URI scheme (BIP21).
 */
export class BitcoinProvider implements PaymentProvider {
  readonly name: string = "Bitcoin (BTC)";

  constructor(private readonly recipientAddress: string) {}

  processPayment(
    request: PaymentRequest,
    onResult: (result: PaymentResult) => void
  ): void {
    try {
      const uri = `bitcoin:${this.recipientAddress}?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;

      // In a browser environment, this would trigger a deep link
      if (typeof window !== 'undefined') {
        window.location.href = uri;
      }

      console.log(`Bitcoin payment intent launched: ${uri}`);
      onResult({ type: 'success', transactionId: 'bitcoin_intent_launched', amount: request.amount });
    } catch (error) {
      onResult({ type: 'error', message: `Failed to launch Bitcoin wallet: ${(error as Error).message}` });
    }
  }
}
