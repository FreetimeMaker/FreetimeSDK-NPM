import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Optimism (OP) Provider.
 * Uses the 'optimism:' URI scheme.
 */
export declare class OptimismProvider extends CryptoProviderBase {
    readonly name = "Optimism (OP)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=OptimismProvider.d.ts.map