import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Tron (TRX) Provider.
 * Uses the 'tron:' URI scheme.
 */
export declare class TronProvider extends CryptoProviderBase {
    readonly name = "Tron (TRX)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=TronProvider.d.ts.map