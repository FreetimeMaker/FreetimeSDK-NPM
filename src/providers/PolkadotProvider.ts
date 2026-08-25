import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Polkadot (DOT) Provider.
 * Uses the 'polkadot:' URI scheme.
 */
export class PolkadotProvider extends CryptoProviderBase {
    readonly name = 'Polkadot (DOT)';

    getUriScheme(): string {
        return 'polkadot:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}