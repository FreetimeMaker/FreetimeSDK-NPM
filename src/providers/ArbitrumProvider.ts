import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Arbitrum (ARB) Provider.
 * Uses the 'arbitrum:' URI scheme.
 */
export class ArbitrumProvider extends CryptoProviderBase {
    readonly name = 'Arbitrum (ARB)';

    getUriScheme(): string {
        return 'arbitrum:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}