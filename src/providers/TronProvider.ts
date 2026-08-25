import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Tron (TRX) Provider.
 * Uses the 'tron:' URI scheme.
 */
export class TronProvider extends CryptoProviderBase {
    readonly name = 'Tron (TRX)';

    getUriScheme(): string {
        return 'tron:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}