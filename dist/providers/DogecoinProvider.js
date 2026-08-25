"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogecoinProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Dogecoin (DOGE) Provider.
 * Uses the 'dogecoin:' URI scheme.
 */
class DogecoinProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Dogecoin (DOGE)';
    }
    getUriScheme() {
        return 'dogecoin:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.DogecoinProvider = DogecoinProvider;
//# sourceMappingURL=DogecoinProvider.js.map