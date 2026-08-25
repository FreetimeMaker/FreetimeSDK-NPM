import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * VeChain (VET) Provider.
 * Uses the 'vechain:' URI scheme.
 */
export declare class VeChainProvider extends CryptoProviderBase {
    readonly name = "VeChain (VET)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=VeChainProvider.d.ts.map