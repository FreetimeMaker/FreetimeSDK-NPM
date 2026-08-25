"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvalancheProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Avalanche (AVAX) Provider.
 * Uses the 'avalanche:' URI scheme.
 */
class AvalancheProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Avalanche (AVAX)';
    }
    getUriScheme() {
        return 'avalanche:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.AvalancheProvider = AvalancheProvider;
//# sourceMappingURL=AvalancheProvider.js.map