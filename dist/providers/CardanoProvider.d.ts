import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Cardano (ADA) Provider.
 * Uses the 'cardano:' URI scheme.
 */
export declare class CardanoProvider extends CryptoProviderBase {
    readonly name = "Cardano (ADA)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=CardanoProvider.d.ts.map