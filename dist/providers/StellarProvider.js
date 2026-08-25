"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Stellar (XLM) Provider.
 * Uses the 'stellar:' URI scheme.
 */
class StellarProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Stellar (XLM)';
    }
    getUriScheme() {
        return 'stellar:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.StellarProvider = StellarProvider;
//# sourceMappingURL=StellarProvider.js.map