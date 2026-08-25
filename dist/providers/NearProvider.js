"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * NEAR (NEAR) Provider.
 * Uses the 'near:' URI scheme.
 */
class NearProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'NEAR (NEAR)';
    }
    getUriScheme() {
        return 'near:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.NearProvider = NearProvider;
//# sourceMappingURL=NearProvider.js.map