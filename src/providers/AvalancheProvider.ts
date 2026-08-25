import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Avalanche (AVAX) Provider.
 * Uses the 'avalanche:' URI scheme.
 */
export class AvalancheProvider extends CryptoProviderBase {
    readonly name = 'Avalanche (AVAX)';

    getUriScheme(): string {
        return 'avalanche:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}