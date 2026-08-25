"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSelectionCLI = void 0;
const PaymentModels_1 = require("./PaymentModels");
const PromotionManager_1 = require("./PromotionManager");
const readline = __importStar(require("readline"));
/**
 * Payment selection system for CLI environments.
 * In browser environments, this would be replaced with a UI component.
 */
class PaymentSelectionCLI {
    constructor(sdk) {
        this.sdk = sdk;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    /**
     * Shows an interactive payment selection interface.
     */
    async showPaymentSelection(request) {
        const providers = this.sdk.getAvailableProviders();
        if (providers.length === 0) {
            return new PaymentModels_1.PaymentResultError('No payment providers registered');
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
            return new PaymentModels_1.PaymentResultCancelled();
        }
        if (choice < 1 || choice > providers.length) {
            this.rl.close();
            return new PaymentModels_1.PaymentResultError('Invalid selection');
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
    async displayPromotion() {
        try {
            const promotion = await PromotionManager_1.PromotionManager.fetchPromotion(this.sdk.config);
            if (promotion) {
                console.log('\n=== Featured Project ===');
                console.log(`📱 ${promotion.title}`);
                console.log(`   ${promotion.description}`);
                console.log(`   🔗 ${promotion.targetUrl}`);
                console.log('========================\n');
            }
        }
        catch (error) {
            // Silently fail if promotion fetch fails
        }
    }
    /**
     * Helper method to ask a question via CLI.
     */
    askQuestion(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
    /**
     * Closes the readline interface.
     */
    close() {
        this.rl.close();
    }
}
exports.PaymentSelectionCLI = PaymentSelectionCLI;
//# sourceMappingURL=PaymentSelection.js.map