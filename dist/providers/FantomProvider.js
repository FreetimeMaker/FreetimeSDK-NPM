"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FantomProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Fantom (FTM) Provider.
 * Uses the 'fantom:' URI scheme.
 */
class FantomProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Fantom (FTM)';
    }
    getUriScheme() {
        return 'fantom:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.FantomProvider = FantomProvider;
//# sourceMappingURL=FantomProvider.js.map