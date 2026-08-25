import { FreetimePay } from './FreetimePay';
import { PaymentRequest, PaymentResult, PaymentResultError, PaymentResultCancelled } from './PaymentModels';
import { PromotionManager } from './PromotionManager';
import * as readline from 'readline';

/**
 * Payment selection system for CLI environments.
 * In browser environments, this would be replaced with a UI component.
 */
export class PaymentSelectionCLI {
    private readonly rl: readline.Interface;

    constructor(private readonly sdk: FreetimePay) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * Shows an interactive payment selection interface.
     */
    async showPaymentSelection(request: PaymentRequest): Promise<PaymentResult> {
        const providers = this.sdk.getAvailableProviders();
        
        if (providers.length === 0) {
            return new PaymentResultError('No payment providers registered');
        }

        // Fetch and display promotion if enabled
        if (this.sdk.config.enablePromotions) {
            await this.displayPromotion();
        }

        // Display payment request details
        console.log('\n=== Payment Request ===');
        console.log(`Amount: ${request.amount} ${request.currency}`);
        console.log(`Description: ${request.description}`);
        console.log('========================\n');

        // Display available providers
        console.log('Select a payment provider:');
        providers.forEach((provider, index) => {
            console.log(`${index + 1}. ${provider.name}`);
        });
        console.log('0. Cancel\n');

        // Get user selection
        const selection = await this.askQuestion('Enter your choice (0-' + providers.length + '): ');
        const choice = parseInt(selection, 10);

        if (choice === 0) {
            this.rl.close();
            return new PaymentResultCancelled();
        }

        if (choice < 1 || choice > providers.length) {
            this.rl.close();
            return new PaymentResultError('Invalid selection');
        }

        const selectedProvider = providers[choice - 1];

        // Process payment with selected provider
        return new Promise((resolve) => {
            this.sdk.processPayment(selectedProvider.name, request, (result) => {
                this.rl.close();
                resolve(result);
            });
        });
    }

    /**
     * Displays a promotion if available.
     */
    private async displayPromotion(): Promise<void> {
        try {
            const promotion = await PromotionManager.fetchPromotion(this.sdk.config);
            if (promotion) {
                console.log('\n=== Featured Project ===');
                console.log(`📱 ${promotion.title}`);
                console.log(`   ${promotion.description}`);
                console.log(`   🔗 ${promotion.targetUrl}`);
                console.log('========================\n');
            }
        } catch (error) {
            // Silently fail if promotion fetch fails
        }
    }

    /**
     * Helper method to ask a question via CLI.
     */
    private askQuestion(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    /**
     * Closes the readline interface.
     */
    close(): void {
        this.rl.close();
    }
}