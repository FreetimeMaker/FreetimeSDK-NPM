import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * NEAR (NEAR) Provider.
 * Uses the 'near:' URI scheme.
 */
export class NearProvider extends CryptoProviderBase {
    readonly name = 'NEAR (NEAR)';

    getUriScheme(): string {
        return 'near:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}