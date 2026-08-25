"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorandProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Algorand (ALGO) Provider.
 * Uses the 'algorand:' URI scheme.
 */
class AlgorandProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Algorand (ALGO)';
    }
    getUriScheme() {
        return 'algorand:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.AlgorandProvider = AlgorandProvider;
//# sourceMappingURL=AlgorandProvider.js.map