import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Hedera (HBAR) Provider.
 * Uses the 'hedera:' URI scheme.
 */
export class HederaProvider extends CryptoProviderBase {
    readonly name = 'Hedera (HBAR)';

    getUriScheme(): string {
        return 'hedera:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}