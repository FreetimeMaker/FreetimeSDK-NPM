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
exports.FreetimePay = void 0;
const PaymentModels_1 = require("./PaymentModels");
const Providers = __importStar(require("./providers"));
/**
 * The main entry point for the Freetime SDK.
 */
class FreetimePay {
    constructor(config) {
        this.config = config;
        this.providers = [];
    }
    /**
     * Registers a payment provider.
     */
    registerProvider(provider) {
        this.providers.push(provider);
    }
    /**
     * Registers all default major cryptocurrency providers.
     * @param addresses A map of currency codes ("BTC", "ETH", "DOGE", etc.) to recipient addresses.
     */
    registerDefaultCryptoProviders(addresses) {
        const providerMappings = {
            'BTC': (addr) => new Providers.BitcoinProvider(addr),
            'ETH': (addr) => new Providers.EthereumProvider(addr),
            'DOGE': (addr) => new Providers.DogecoinProvider(addr),
            'BCH': (addr) => new Providers.BitcoinCashProvider(addr),
            'DASH': (addr) => new Providers.DashProvider(addr),
            'ZEC': (addr) => new Providers.ZcashProvider(addr),
            'XRP': (addr) => new Providers.XRPProvider(addr),
            'ADA': (addr) => new Providers.CardanoProvider(addr),
            'DOT': (addr) => new Providers.PolkadotProvider(addr),
            'BNB': (addr) => new Providers.BNBProvider(addr),
            'XNO': (addr) => new Providers.NanoProvider(addr),
            'XMR': (addr) => new Providers.MoneroProvider(addr),
            'LTC': (addr) => new Providers.LitecoinProvider(addr),
            'SOL': (addr) => new Providers.SolanaProvider(addr),
            'XLM': (addr) => new Providers.StellarProvider(addr),
            'TRX': (addr) => new Providers.TronProvider(addr),
            'ALGO': (addr) => new Providers.AlgorandProvider(addr),
            'ATOM': (addr) => new Providers.CosmosProvider(addr),
            'XTZ': (addr) => new Providers.TezosProvider(addr),
            'AVAX': (addr) => new Providers.AvalancheProvider(addr),
            'MATIC': (addr) => new Providers.PolygonProvider(addr),
            'FTM': (addr) => new Providers.FantomProvider(addr),
            'NEAR': (addr) => new Providers.NearProvider(addr),
            'OP': (addr) => new Providers.OptimismProvider(addr),
            'ARB': (addr) => new Providers.ArbitrumProvider(addr),
            'BASE': (addr) => new Providers.BaseProvider(addr),
            'CELO': (addr) => new Providers.CeloProvider(addr),
            'EGLD': (addr) => new Providers.MultiversXProvider(addr),
            'HBAR': (addr) => new Providers.HederaProvider(addr),
            'APT': (addr) => new Providers.AptosProvider(addr),
            'SUI': (addr) => new Providers.SuiProvider(addr),
            'VET': (addr) => new Providers.VeChainProvider(addr)
        };
        for (const [currency, address] of Object.entries(addresses)) {
            const providerFactory = providerMappings[currency.toUpperCase()];
            if (providerFactory && address) {
                this.registerProvider(providerFactory(address));
            }
        }
    }
    /**
     * Returns the list of available providers.
     */
    getAvailableProviders() {
        return [...this.providers];
    }
    /**
     * Processes a payment with the selected provider.
     */
    processPayment(providerName, request, onResult) {
        const provider = this.providers.find(p => p.name.toLowerCase() === providerName.toLowerCase());
        if (!provider) {
            onResult(new PaymentModels_1.PaymentResultError(`Provider not found: ${providerName}`));
            return;
        }
        console.log(`Processing payment: ${request.amount} ${request.currency} via ${providerName}`);
        provider.processPayment(request, onResult);
    }
    /**
     * Shows a payment selection interface (CLI-based for Node.js).
     * In a browser environment, this would show a UI.
     */
    async showPaymentSheet(_request) {
        return new Promise((resolve) => {
            if (this.providers.length === 0) {
                resolve(new PaymentModels_1.PaymentResultError('No payment providers registered'));
                return;
            }
            // For CLI environment, display available providers
            console.log('\n=== Available Payment Providers ===');
            this.providers.forEach((provider, index) => {
                console.log(`${index + 1}. ${provider.name}`);
            });
            console.log('=====================================\n');
            // In a real implementation, you would prompt for user selection here
            // For now, we'll return an error indicating UI interaction is needed
            resolve(new PaymentModels_1.PaymentResultError('UI interaction required - use processPayment() directly for programmatic payments'));
        });
    }
}
exports.FreetimePay = FreetimePay;
//# sourceMappingURL=FreetimePay.js.map