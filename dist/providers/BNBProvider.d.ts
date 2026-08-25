import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * BNB (BNB) Provider.
 * Uses the 'bnb:' URI scheme.
 */
export declare class BNBProvider extends CryptoProviderBase {
    readonly name = "BNB (BNB)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=BNBProvider.d.ts.map