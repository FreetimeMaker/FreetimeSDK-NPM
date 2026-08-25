import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Fantom (FTM) Provider.
 * Uses the 'fantom:' URI scheme.
 */
export declare class FantomProvider extends CryptoProviderBase {
    readonly name = "Fantom (FTM)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=FantomProvider.d.ts.map