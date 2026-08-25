"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiversXProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * MultiversX (EGLD) Provider.
 * Uses the 'elrond:' URI scheme.
 */
class MultiversXProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'MultiversX (EGLD)';
    }
    getUriScheme() {
        return 'elrond:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.MultiversXProvider = MultiversXProvider;
//# sourceMappingURL=MultiversXProvider.js.map