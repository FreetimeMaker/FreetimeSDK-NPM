"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumProvider = void 0;
const PaymentModels_1 = require("../PaymentModels");
/**
 * Ethereum (ETH) Provider.
 * Uses the 'ethereum:' URI scheme (ERC-681).
 */
class EthereumProvider {
    constructor(recipientAddress) {
        this.recipientAddress = recipientAddress;
        this.name = 'Ethereum (ETH)';
    }
    processPayment(request, onResult) {
        try {
            // Ethereum ERC-681 format: ethereum:address@chainId?value=amount
            const uri = `ethereum:${this.recipientAddress}@1?value=${request.amount}`;
            console.log(`Ethereum Payment URI: ${uri}`);
            // For web environments
            if (typeof window !== 'undefined' && window.open) {
                window.open(uri, '_blank');
                onResult(new PaymentModels_1.PaymentResultSuccess('ethereum_intent_launched', request.amount));
            }
            else {
                // For Node.js CLI environment
                onResult(new PaymentModels_1.PaymentResultSuccess('ethereum_uri_generated', request.amount));
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            onResult(new PaymentModels_1.PaymentResultError(`Ethereum payment failed: ${errorMessage}`));
        }
    }
    /**
     * Gets the Ethereum URI for a payment request.
     */
    getPaymentUri(request) {
        return `ethereum:${this.recipientAddress}@1?value=${request.amount}`;
    }
}
exports.EthereumProvider = EthereumProvider;
//# sourceMappingURL=EthereumProvider.js.map