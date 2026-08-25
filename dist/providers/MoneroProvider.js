"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneroProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Monero (XMR) Provider.
 * Uses the 'monero:' URI scheme.
 */
class MoneroProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Monero (XMR)';
    }
    getUriScheme() {
        return 'monero:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.MoneroProvider = MoneroProvider;
//# sourceMappingURL=MoneroProvider.js.map