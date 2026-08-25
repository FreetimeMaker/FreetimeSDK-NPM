/**
 * Represents a payment request.
 * @param amount The amount to be paid.
 * @param currency The currency code (e.g., "USD", "EUR").
 * @param description Description of the purchase.
 */
export declare class PaymentRequest {
    readonly amount: number;
    readonly currency: string;
    readonly description: string;
    readonly metadata: Record<string, string>;
    constructor(amount: number, currency: string, description: string, metadata?: Record<string, string>);
}
/**
 * Result of a payment operation.
 */
export type PaymentResult = PaymentResultSuccess | PaymentResultError | PaymentResultCancelled;
export declare class PaymentResultSuccess {
    readonly transactionId: string;
    readonly amount: number;
    constructor(transactionId: string, amount: number);
}
export declare class PaymentResultError {
    readonly message: string;
    readonly code: string | null;
    constructor(message: string, code?: string | null);
}
export declare class PaymentResultCancelled {
    constructor();
}
//# sourceMappingURL=PaymentModels.d.ts.map