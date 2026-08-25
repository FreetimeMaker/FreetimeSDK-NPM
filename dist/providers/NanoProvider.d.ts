import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Nano (XNO) Provider.
 * Uses the 'nano:' URI scheme.
 */
export declare class NanoProvider extends CryptoProviderBase {
    readonly name = "Nano (XNO)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=NanoProvider.d.ts.map