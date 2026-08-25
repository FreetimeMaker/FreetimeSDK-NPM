import { CryptoProviderBase } from './CryptoProviderBase';
import { PaymentRequest } from '../PaymentModels';

/**
 * Solana (SOL) Provider.
 * Uses the 'solana:' URI scheme.
 */
export class SolanaProvider extends CryptoProviderBase {
    readonly name = 'Solana (SOL)';

    getUriScheme(): string {
        return 'solana:';
    }

    getUriParameters(request: PaymentRequest): string {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}