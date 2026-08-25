import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Aptos (APT) Provider.
 * Uses the 'aptos:' URI scheme.
 */
export class AptosProvider extends CryptoProviderBase {
    readonly name = 'Aptos (APT)';

    getUriScheme(): string {
        return 'aptos:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}