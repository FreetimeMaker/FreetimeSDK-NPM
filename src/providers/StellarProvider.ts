import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Stellar (XLM) Provider.
 * Uses the 'stellar:' URI scheme.
 */
export class StellarProvider extends CryptoProviderBase {
    readonly name = 'Stellar (XLM)';

    getUriScheme(): string {
        return 'stellar:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}