import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Base (BASE) Provider.
 * Uses the 'base:' URI scheme.
 */
export class BaseProvider extends CryptoProviderBase {
    readonly name = 'Base (BASE)';

    getUriScheme(): string {
        return 'base:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}