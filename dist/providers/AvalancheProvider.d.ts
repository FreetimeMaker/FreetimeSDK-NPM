import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Avalanche (AVAX) Provider.
 * Uses the 'avalanche:' URI scheme.
 */
export declare class AvalancheProvider extends CryptoProviderBase {
    readonly name = "Avalanche (AVAX)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=AvalancheProvider.d.ts.map