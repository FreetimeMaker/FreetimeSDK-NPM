import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Dash (DASH) Provider.
 * Uses the 'dash:' URI scheme.
 */
export class DashProvider extends CryptoProviderBase {
    readonly name = 'Dash (DASH)';

    getUriScheme(): string {
        return 'dash:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}