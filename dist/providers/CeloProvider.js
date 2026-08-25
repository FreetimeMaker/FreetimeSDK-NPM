"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeloProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Celo (CELO) Provider.
 * Uses the 'celo:' URI scheme.
 */
class CeloProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Celo (CELO)';
    }
    getUriScheme() {
        return 'celo:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.CeloProvider = CeloProvider;
//# sourceMappingURL=CeloProvider.js.map