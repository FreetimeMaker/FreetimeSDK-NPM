import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * MultiversX (EGLD) Provider.
 * Uses the 'elrond:' URI scheme.
 */
export class MultiversXProvider extends CryptoProviderBase {
    readonly name = 'MultiversX (EGLD)';

    getUriScheme(): string {
        return 'elrond:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}