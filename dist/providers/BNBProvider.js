"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BNBProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * BNB (BNB) Provider.
 * Uses the 'bnb:' URI scheme.
 */
class BNBProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'BNB (BNB)';
    }
    getUriScheme() {
        return 'bnb:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.BNBProvider = BNBProvider;
//# sourceMappingURL=BNBProvider.js.map