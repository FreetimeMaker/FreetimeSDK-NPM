import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Algorand (ALGO) Provider.
 * Uses the 'algorand:' URI scheme.
 */
export class AlgorandProvider extends CryptoProviderBase {
    readonly name = 'Algorand (ALGO)';

    getUriScheme(): string {
        return 'algorand:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}