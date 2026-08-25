import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Dogecoin (DOGE) Provider.
 * Uses the 'dogecoin:' URI scheme.
 */
export declare class DogecoinProvider extends CryptoProviderBase {
    readonly name = "Dogecoin (DOGE)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=DogecoinProvider.d.ts.map