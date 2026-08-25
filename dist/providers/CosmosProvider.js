"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Cosmos (ATOM) Provider.
 * Uses the 'cosmos:' URI scheme.
 */
class CosmosProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Cosmos (ATOM)';
    }
    getUriScheme() {
        return 'cosmos:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.CosmosProvider = CosmosProvider;
//# sourceMappingURL=CosmosProvider.js.map