"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitecoinProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Litecoin (LTC) Provider.
 * Uses the 'litecoin:' URI scheme.
 */
class LitecoinProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Litecoin (LTC)';
    }
    getUriScheme() {
        return 'litecoin:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.LitecoinProvider = LitecoinProvider;
//# sourceMappingURL=LitecoinProvider.js.map