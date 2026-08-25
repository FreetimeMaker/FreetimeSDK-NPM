import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Algorand (ALGO) Provider.
 * Uses the 'algorand:' URI scheme.
 */
export declare class AlgorandProvider extends CryptoProviderBase {
    readonly name = "Algorand (ALGO)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=AlgorandProvider.d.ts.map