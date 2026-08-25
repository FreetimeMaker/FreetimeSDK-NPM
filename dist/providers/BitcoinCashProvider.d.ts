import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Bitcoin Cash (BCH) Provider.
 * Uses the 'bitcoincash:' URI scheme.
 */
export declare class BitcoinCashProvider extends CryptoProviderBase {
    readonly name = "Bitcoin Cash (BCH)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=BitcoinCashProvider.d.ts.map