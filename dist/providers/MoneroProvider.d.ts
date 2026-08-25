import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Monero (XMR) Provider.
 * Uses the 'monero:' URI scheme.
 */
export declare class MoneroProvider extends CryptoProviderBase {
    readonly name = "Monero (XMR)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=MoneroProvider.d.ts.map