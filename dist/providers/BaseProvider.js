"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Base (BASE) Provider.
 * Uses the 'base:' URI scheme.
 */
class BaseProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Base (BASE)';
    }
    getUriScheme() {
        return 'base:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.BaseProvider = BaseProvider;
//# sourceMappingURL=BaseProvider.js.map