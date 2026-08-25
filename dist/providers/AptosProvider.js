"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AptosProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Aptos (APT) Provider.
 * Uses the 'aptos:' URI scheme.
 */
class AptosProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Aptos (APT)';
    }
    getUriScheme() {
        return 'aptos:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.AptosProvider = AptosProvider;
//# sourceMappingURL=AptosProvider.js.map