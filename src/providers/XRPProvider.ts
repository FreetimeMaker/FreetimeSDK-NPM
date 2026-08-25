import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * XRP (XRP) Provider.
 * Uses the 'xrpl:' URI scheme.
 */
export class XRPProvider extends CryptoProviderBase {
    readonly name = 'XRP (XRP)';

    getUriScheme(): string {
        return 'xrpl:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}