import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Bitcoin (BTC) Provider.
 * Uses the 'bitcoin:' URI scheme (BIP21).
 */
export declare class BitcoinProvider extends CryptoProviderBase {
    readonly name = "Bitcoin (BTC)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=BitcoinProvider.d.ts.map