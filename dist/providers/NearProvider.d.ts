import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * NEAR (NEAR) Provider.
 * Uses the 'near:' URI scheme.
 */
export declare class NearProvider extends CryptoProviderBase {
    readonly name = "NEAR (NEAR)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=NearProvider.d.ts.map