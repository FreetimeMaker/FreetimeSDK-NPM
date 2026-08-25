import { FreetimePay } from './FreetimePay';
import { PaymentRequest, PaymentResult } from './PaymentModels';
/**
 * Payment selection system for CLI environments.
 * In browser environments, this would be replaced with a UI component.
 */
export declare class PaymentSelectionCLI {
    private readonly sdk;
    private readonly rl;
    constructor(sdk: FreetimePay);
    /**
     * Shows an interactive payment selection interface.
     */
    showPaymentSelection(request: PaymentRequest): Promise<PaymentResult>;
    /**
     * Displays a promotion if available.
     */
    private displayPromotion;
    /**
     * Helper method to ask a question via CLI.
     */
    private askQuestion;
    /**
     * Closes the readline interface.
     */
    close(): void;
}
//# sourceMappingURL=PaymentSelection.d.ts.map