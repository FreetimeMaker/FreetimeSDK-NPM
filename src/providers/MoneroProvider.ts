import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Monero (XMR) Provider.
 * Uses the 'monero:' URI scheme.
 */
export class MoneroProvider extends CryptoProviderBase {
    readonly name = 'Monero (XMR)';

    getUriScheme(): string {
        return 'monero:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}