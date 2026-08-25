import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Litecoin (LTC) Provider.
 * Uses the 'litecoin:' URI scheme.
 */
export class LitecoinProvider extends CryptoProviderBase {
    readonly name = 'Litecoin (LTC)';

    getUriScheme(): string {
        return 'litecoin:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}