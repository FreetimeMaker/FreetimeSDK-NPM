"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Hedera (HBAR) Provider.
 * Uses the 'hedera:' URI scheme.
 */
class HederaProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Hedera (HBAR)';
    }
    getUriScheme() {
        return 'hedera:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.HederaProvider = HederaProvider;
//# sourceMappingURL=HederaProvider.js.map