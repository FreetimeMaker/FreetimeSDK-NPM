"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardanoProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Cardano (ADA) Provider.
 * Uses the 'cardano:' URI scheme.
 */
class CardanoProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Cardano (ADA)';
    }
    getUriScheme() {
        return 'cardano:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.CardanoProvider = CardanoProvider;
//# sourceMappingURL=CardanoProvider.js.map