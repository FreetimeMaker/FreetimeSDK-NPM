import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Cosmos (ATOM) Provider.
 * Uses the 'cosmos:' URI scheme.
 */
export declare class CosmosProvider extends CryptoProviderBase {
    readonly name = "Cosmos (ATOM)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=CosmosProvider.d.ts.map