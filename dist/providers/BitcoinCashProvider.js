"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinCashProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Bitcoin Cash (BCH) Provider.
 * Uses the 'bitcoincash:' URI scheme.
 */
class BitcoinCashProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Bitcoin Cash (BCH)';
    }
    getUriScheme() {
        return 'bitcoincash:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.BitcoinCashProvider = BitcoinCashProvider;
//# sourceMappingURL=BitcoinCashProvider.js.map