"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Bitcoin (BTC) Provider.
 * Uses the 'bitcoin:' URI scheme (BIP21).
 */
class BitcoinProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Bitcoin (BTC)';
    }
    getUriScheme() {
        return 'bitcoin:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.BitcoinProvider = BitcoinProvider;
//# sourceMappingURL=BitcoinProvider.js.map