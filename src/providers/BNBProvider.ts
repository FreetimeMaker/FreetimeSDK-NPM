import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * BNB (BNB) Provider.
 * Uses the 'bnb:' URI scheme.
 */
export class BNBProvider extends CryptoProviderBase {
    readonly name = 'BNB (BNB)';

    getUriScheme(): string {
        return 'bnb:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}