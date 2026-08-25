import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Celo (CELO) Provider.
 * Uses the 'celo:' URI scheme.
 */
export class CeloProvider extends CryptoProviderBase {
    readonly name = 'Celo (CELO)';

    getUriScheme(): string {
        return 'celo:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}