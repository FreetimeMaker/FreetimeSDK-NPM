"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Tezos (XTZ) Provider.
 * Uses the 'tezos:' URI scheme.
 */
class TezosProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Tezos (XTZ)';
    }
    getUriScheme() {
        return 'tezos:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.TezosProvider = TezosProvider;
//# sourceMappingURL=TezosProvider.js.map