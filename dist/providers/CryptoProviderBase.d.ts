import { PaymentProvider } from '../PaymentProvider';
import { PaymentRequest, PaymentResult } from '../PaymentModels';
/**
 * Base class for cryptocurrency providers that use URI schemes.
 */
export declare abstract class CryptoProviderBase implements PaymentProvider {
    protected readonly recipientAddress: string;
    constructor(recipientAddress: string);
    abstract readonly name: string;
    abstract getUriScheme(): string;
    abstract getUriParameters(request: PaymentRequest): string;
    processPayment(request: PaymentRequest, onResult: (result: PaymentResult) => void): void;
    getPaymentUri(request: PaymentRequest): string;
}
//# sourceMappingURL=CryptoProviderBase.d.ts.map