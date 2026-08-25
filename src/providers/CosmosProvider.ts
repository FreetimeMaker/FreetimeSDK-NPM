import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Cosmos (ATOM) Provider.
 * Uses the 'cosmos:' URI scheme.
 */
export class CosmosProvider extends CryptoProviderBase {
    readonly name = 'Cosmos (ATOM)';

    getUriScheme(): string {
        return 'cosmos:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}