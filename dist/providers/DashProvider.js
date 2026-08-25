"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Dash (DASH) Provider.
 * Uses the 'dash:' URI scheme.
 */
class DashProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Dash (DASH)';
    }
    getUriScheme() {
        return 'dash:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.DashProvider = DashProvider;
//# sourceMappingURL=DashProvider.js.map