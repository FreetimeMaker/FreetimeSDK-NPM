import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Polygon (MATIC) Provider.
 * Uses the 'polygon:' URI scheme.
 */
export class PolygonProvider extends CryptoProviderBase {
    readonly name = 'Polygon (MATIC)';

    getUriScheme(): string {
        return 'polygon:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}