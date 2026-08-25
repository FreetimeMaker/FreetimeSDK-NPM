"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZcashProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Zcash (ZEC) Provider.
 * Uses the 'zcash:' URI scheme.
 */
class ZcashProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Zcash (ZEC)';
    }
    getUriScheme() {
        return 'zcash:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.ZcashProvider = ZcashProvider;
//# sourceMappingURL=ZcashProvider.js.map