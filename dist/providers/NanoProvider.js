"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanoProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Nano (XNO) Provider.
 * Uses the 'nano:' URI scheme.
 */
class NanoProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Nano (XNO)';
    }
    getUriScheme() {
        return 'nano:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.NanoProvider = NanoProvider;
//# sourceMappingURL=NanoProvider.js.map