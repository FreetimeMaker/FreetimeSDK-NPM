import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * MultiversX (EGLD) Provider.
 * Uses the 'elrond:' URI scheme.
 */
export declare class MultiversXProvider extends CryptoProviderBase {
    readonly name = "MultiversX (EGLD)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=MultiversXProvider.d.ts.map