import { PaymentProvider } from '../PaymentProvider';
import { PaymentRequest, PaymentResult } from '../PaymentModels';
/**
 * Ethereum (ETH) Provider.
 * Uses the 'ethereum:' URI scheme (ERC-681).
 */
export declare class EthereumProvider implements PaymentProvider {
    private readonly recipientAddress;
    readonly name = "Ethereum (ETH)";
    constructor(recipientAddress: string);
    processPayment(request: PaymentRequest, onResult: (result: PaymentResult) => void): void;
    /**
     * Gets the Ethereum URI for a payment request.
     */
    getPaymentUri(request: PaymentRequest): string;
}
//# sourceMappingURL=EthereumProvider.d.ts.map