import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Base (BASE) Provider.
 * Uses the 'base:' URI scheme.
 */
export declare class BaseProvider extends CryptoProviderBase {
    readonly name = "Base (BASE)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=BaseProvider.d.ts.map