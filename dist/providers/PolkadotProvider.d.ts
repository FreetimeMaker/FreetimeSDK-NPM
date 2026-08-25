import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Polkadot (DOT) Provider.
 * Uses the 'polkadot:' URI scheme.
 */
export declare class PolkadotProvider extends CryptoProviderBase {
    readonly name = "Polkadot (DOT)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=PolkadotProvider.d.ts.map