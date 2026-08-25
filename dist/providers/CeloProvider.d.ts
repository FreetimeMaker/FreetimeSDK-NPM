import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Celo (CELO) Provider.
 * Uses the 'celo:' URI scheme.
 */
export declare class CeloProvider extends CryptoProviderBase {
    readonly name = "Celo (CELO)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=CeloProvider.d.ts.map