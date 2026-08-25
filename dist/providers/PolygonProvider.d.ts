import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Polygon (MATIC) Provider.
 * Uses the 'polygon:' URI scheme.
 */
export declare class PolygonProvider extends CryptoProviderBase {
    readonly name = "Polygon (MATIC)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=PolygonProvider.d.ts.map