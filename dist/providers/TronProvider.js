"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Tron (TRX) Provider.
 * Uses the 'tron:' URI scheme.
 */
class TronProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Tron (TRX)';
    }
    getUriScheme() {
        return 'tron:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.TronProvider = TronProvider;
//# sourceMappingURL=TronProvider.js.map