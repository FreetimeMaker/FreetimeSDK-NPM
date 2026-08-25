import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Arbitrum (ARB) Provider.
 * Uses the 'arbitrum:' URI scheme.
 */
export declare class ArbitrumProvider extends CryptoProviderBase {
    readonly name = "Arbitrum (ARB)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=ArbitrumProvider.d.ts.map