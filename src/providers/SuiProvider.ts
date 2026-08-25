import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Sui (SUI) Provider.
 * Uses the 'sui:' URI scheme.
 */
export class SuiProvider extends CryptoProviderBase {
    readonly name = 'Sui (SUI)';

    getUriScheme(): string {
        return 'sui:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}