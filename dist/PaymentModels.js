"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResultCancelled = exports.PaymentResultError = exports.PaymentResultSuccess = exports.PaymentRequest = void 0;
/**
 * Represents a payment request.
 * @param amount The amount to be paid.
 * @param currency The currency code (e.g., "USD", "EUR").
 * @param description Description of the purchase.
 */
class PaymentRequest {
    constructor(amount, currency, description, metadata = {}) {
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.metadata = metadata;
    }
}
exports.PaymentRequest = PaymentRequest;
class PaymentResultSuccess {
    constructor(transactionId, amount) {
        this.transactionId = transactionId;
        this.amount = amount;
    }
}
exports.PaymentResultSuccess = PaymentResultSuccess;
class PaymentResultError {
    constructor(message, code = null) {
        this.message = message;
        this.code = code;
    }
}
exports.PaymentResultError = PaymentResultError;
class PaymentResultCancelled {
    constructor() { }
}
exports.PaymentResultCancelled = PaymentResultCancelled;
//# sourceMappingURL=PaymentModels.js.map