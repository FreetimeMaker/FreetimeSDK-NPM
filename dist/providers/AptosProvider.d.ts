import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Aptos (APT) Provider.
 * Uses the 'aptos:' URI scheme.
 */
export declare class AptosProvider extends CryptoProviderBase {
    readonly name = "Aptos (APT)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=AptosProvider.d.ts.map