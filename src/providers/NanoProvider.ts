import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Nano (XNO) Provider.
 * Uses the 'nano:' URI scheme.
 */
export class NanoProvider extends CryptoProviderBase {
    readonly name = 'Nano (XNO)';

    getUriScheme(): string {
        return 'nano:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}