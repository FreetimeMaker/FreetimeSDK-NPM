import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Zcash (ZEC) Provider.
 * Uses the 'zcash:' URI scheme.
 */
export class ZcashProvider extends CryptoProviderBase {
    readonly name = 'Zcash (ZEC)';

    getUriScheme(): string {
        return 'zcash:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}