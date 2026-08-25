import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Sui (SUI) Provider.
 * Uses the 'sui:' URI scheme.
 */
export declare class SuiProvider extends CryptoProviderBase {
    readonly name = "Sui (SUI)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=SuiProvider.d.ts.map