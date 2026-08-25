"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimismProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Optimism (OP) Provider.
 * Uses the 'optimism:' URI scheme.
 */
class OptimismProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Optimism (OP)';
    }
    getUriScheme() {
        return 'optimism:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.OptimismProvider = OptimismProvider;
//# sourceMappingURL=OptimismProvider.js.map