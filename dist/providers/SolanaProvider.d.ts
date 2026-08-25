import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';
/**
 * Solana (SOL) Provider.
 * Uses the 'solana:' URI scheme.
 */
export declare class SolanaProvider extends CryptoProviderBase {
    readonly name = "Solana (SOL)";
    getUriScheme(): string;
    getUriParameters(request: PaymentRequest): string;
}
//# sourceMappingURL=SolanaProvider.d.ts.map