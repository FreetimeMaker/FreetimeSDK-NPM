"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolkadotProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Polkadot (DOT) Provider.
 * Uses the 'polkadot:' URI scheme.
 */
class PolkadotProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Polkadot (DOT)';
    }
    getUriScheme() {
        return 'polkadot:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.PolkadotProvider = PolkadotProvider;
//# sourceMappingURL=PolkadotProvider.js.map