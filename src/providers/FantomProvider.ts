import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Fantom (FTM) Provider.
 * Uses the 'fantom:' URI scheme.
 */
export class FantomProvider extends CryptoProviderBase {
    readonly name = 'Fantom (FTM)';

    getUriScheme(): string {
        return 'fantom:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}