/**
 * Represents a payment request.
 * @param amount The amount to be paid.
 * @param currency The currency code (e.g., "USD", "EUR").
 * @param description Description of the purchase.
 */
export class PaymentRequest {
    constructor(
        public readonly amount: number,
        public readonly currency: string,
        public readonly description: string,
        public readonly metadata: Record<string, string> = {}
    ) {}
}

/**
 * Result of a payment operation.
 */
export type PaymentResult = PaymentResultSuccess | PaymentResultError | PaymentResultCancelled;

export class PaymentResultSuccess {
    constructor(
        public readonly transactionId: string,
        public readonly amount: number
    ) {}
}

export class PaymentResultError {
    constructor(
        public readonly message: string,
        public readonly code: string | null = null
    ) {}
}

export class PaymentResultCancelled {
    constructor() {}
}