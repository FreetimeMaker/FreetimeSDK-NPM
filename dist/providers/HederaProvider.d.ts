import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Hedera (HBAR) Provider.
 * Uses the 'hedera:' URI scheme.
 */
export declare class HederaProvider extends CryptoProviderBase {
    readonly name = "Hedera (HBAR)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=HederaProvider.d.ts.map