import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Zcash (ZEC) Provider.
 * Uses the 'zcash:' URI scheme.
 */
export declare class ZcashProvider extends CryptoProviderBase {
    readonly name = "Zcash (ZEC)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=ZcashProvider.d.ts.map