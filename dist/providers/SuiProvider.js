"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Sui (SUI) Provider.
 * Uses the 'sui:' URI scheme.
 */
class SuiProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Sui (SUI)';
    }
    getUriScheme() {
        return 'sui:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.SuiProvider = SuiProvider;
//# sourceMappingURL=SuiProvider.js.map