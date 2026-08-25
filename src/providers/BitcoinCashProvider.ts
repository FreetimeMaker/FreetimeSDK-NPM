import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Bitcoin Cash (BCH) Provider.
 * Uses the 'bitcoincash:' URI scheme.
 */
export class BitcoinCashProvider extends CryptoProviderBase {
    readonly name = 'Bitcoin Cash (BCH)';

    getUriScheme(): string {
        return 'bitcoincash:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}