import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Dash (DASH) Provider.
 * Uses the 'dash:' URI scheme.
 */
export declare class DashProvider extends CryptoProviderBase {
    readonly name = "Dash (DASH)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=DashProvider.d.ts.map