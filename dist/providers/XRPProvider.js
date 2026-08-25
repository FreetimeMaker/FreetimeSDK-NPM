"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRPProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * XRP (XRP) Provider.
 * Uses the 'xrpl:' URI scheme.
 */
class XRPProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'XRP (XRP)';
    }
    getUriScheme() {
        return 'xrpl:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.XRPProvider = XRPProvider;
//# sourceMappingURL=XRPProvider.js.map