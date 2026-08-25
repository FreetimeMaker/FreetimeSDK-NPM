"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Solana (SOL) Provider.
 * Uses the 'solana:' URI scheme.
 */
class SolanaProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Solana (SOL)';
    }
    getUriScheme() {
        return 'solana:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.SolanaProvider = SolanaProvider;
//# sourceMappingURL=SolanaProvider.js.map