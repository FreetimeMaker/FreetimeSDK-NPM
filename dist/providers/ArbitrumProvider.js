"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbitrumProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Arbitrum (ARB) Provider.
 * Uses the 'arbitrum:' URI scheme.
 */
class ArbitrumProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Arbitrum (ARB)';
    }
    getUriScheme() {
        return 'arbitrum:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.ArbitrumProvider = ArbitrumProvider;
//# sourceMappingURL=ArbitrumProvider.js.map