import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Dogecoin (DOGE) Provider.
 * Uses the 'dogecoin:' URI scheme.
 */
export class DogecoinProvider extends CryptoProviderBase {
    readonly name = 'Dogecoin (DOGE)';

    getUriScheme(): string {
        return 'dogecoin:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}