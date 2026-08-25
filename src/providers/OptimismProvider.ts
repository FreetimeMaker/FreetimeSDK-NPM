import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Optimism (OP) Provider.
 * Uses the 'optimism:' URI scheme.
 */
export class OptimismProvider extends CryptoProviderBase {
    readonly name = 'Optimism (OP)';

    getUriScheme(): string {
        return 'optimism:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}