"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoProviderBase = void 0;
const PaymentModels_1 = require("../PaymentModels");
/**
 * Base class for cryptocurrency providers that use URI schemes.
 */
class CryptoProviderBase {
    constructor(recipientAddress) {
        this.recipientAddress = recipientAddress;
    }
    processPayment(request, onResult) {
        try {
            const uri = this.getPaymentUri(request);
            console.log(`${this.name} Payment URI: ${uri}`);
            // For web environments
            if (typeof window !== 'undefined' && window.open) {
                window.open(uri, '_blank');
                onResult(new PaymentModels_1.PaymentResultSuccess(`${this.name.toLowerCase().replace(/\s/g, '_')}_intent_launched`, request.amount));
            }
            else {
                // For Node.js CLI environment
                onResult(new PaymentModels_1.PaymentResultSuccess(`${this.name.toLowerCase().replace(/\s/g, '_')}_uri_generated`, request.amount));
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            onResult(new PaymentModels_1.PaymentResultError(`${this.name} payment failed: ${errorMessage}`));
        }
    }
    getPaymentUri(request) {
        return `${this.getUriScheme()}${this.recipientAddress}${this.getUriParameters(request)}`;
    }
}
exports.CryptoProviderBase = CryptoProviderBase;
//# sourceMappingURL=CryptoProviderBase.js.map