import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Tezos (XTZ) Provider.
 * Uses the 'tezos:' URI scheme.
 */
export class TezosProvider extends CryptoProviderBase {
    readonly name = 'Tezos (XTZ)';

    getUriScheme(): string {
        return 'tezos:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}