"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonProvider = void 0;
const CryptoProviderBase_1 = require("./CryptoProviderBase");
/**
 * Polygon (MATIC) Provider.
 * Uses the 'polygon:' URI scheme.
 */
class PolygonProvider extends CryptoProviderBase_1.CryptoProviderBase {
    constructor() {
        super(...arguments);
        this.name = 'Polygon (MATIC)';
    }
    getUriScheme() {
        return 'polygon:';
    }
    getUriParameters(request) {
        return `?amount=${request.amount}&label=${encodeURIComponent(request.description)}`;
    }
}
exports.PolygonProvider = PolygonProvider;
//# sourceMappingURL=PolygonProvider.js.map