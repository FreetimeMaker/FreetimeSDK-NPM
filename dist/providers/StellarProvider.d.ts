import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Stellar (XLM) Provider.
 * Uses the 'stellar:' URI scheme.
 */
export declare class StellarProvider extends CryptoProviderBase {
    readonly name = "Stellar (XLM)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=StellarProvider.d.ts.map