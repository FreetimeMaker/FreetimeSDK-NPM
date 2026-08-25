import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Litecoin (LTC) Provider.
 * Uses the 'litecoin:' URI scheme.
 */
export declare class LitecoinProvider extends CryptoProviderBase {
    readonly name = "Litecoin (LTC)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=LitecoinProvider.d.ts.map