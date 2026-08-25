import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Tezos (XTZ) Provider.
 * Uses the 'tezos:' URI scheme.
 */
export declare class TezosProvider extends CryptoProviderBase {
    readonly name = "Tezos (XTZ)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=TezosProvider.d.ts.map