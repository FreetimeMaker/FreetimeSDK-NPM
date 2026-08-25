import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * VeChain (VET) Provider.
 * Uses the 'vechain:' URI scheme.
 */
export class VeChainProvider extends CryptoProviderBase {
    readonly name = 'VeChain (VET)';

    getUriScheme(): string {
        return 'vechain:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}