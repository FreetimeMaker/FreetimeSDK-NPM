import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Cardano (ADA) Provider.
 * Uses the 'cardano:' URI scheme.
 */
export class CardanoProvider extends CryptoProviderBase {
    readonly name = 'Cardano (ADA)';

    getUriScheme(): string {
        return 'cardano:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}