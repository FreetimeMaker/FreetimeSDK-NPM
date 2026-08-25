import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * XRP (XRP) Provider.
 * Uses the 'xrpl:' URI scheme.
 */
export declare class XRPProvider extends CryptoProviderBase {
    readonly name = "XRP (XRP)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=XRPProvider.d.ts.map