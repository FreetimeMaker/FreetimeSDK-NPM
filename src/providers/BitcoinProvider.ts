import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Bitcoin (BTC) Provider.
 * Uses the 'bitcoin:' URI scheme (BIP21).
 */
export class BitcoinProvider extends CryptoProviderBase {
    readonly name = 'Bitcoin (BTC)';

    getUriScheme(): string {
        return 'bitcoin:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}