"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalWalletManager = exports.UsdPaymentRequestWithWalletSelection = exports.ExternalWalletApp = void 0;
const types_1 = require("./types");
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * External wallet app integration for crypto payments
 */
class ExternalWalletApp {
    constructor(name, packageName, supportedCoins, deepLinkScheme, iconUrl) {
        this.name = name;
        this.packageName = packageName;
        this.supportedCoins = supportedCoins;
        this.deepLinkScheme = deepLinkScheme;
        this.iconUrl = iconUrl;
    }
    static getAllWalletApps() {
        return [
            ExternalWalletApp.TRUST_WALLET, ExternalWalletApp.META_MASK, ExternalWalletApp.COINBASE_WALLET,
            ExternalWalletApp.BINANCE_WALLET, ExternalWalletApp.EXODUS, ExternalWalletApp.ATOMIC_WALLET,
            ExternalWalletApp.LEDGER_LIVE, ExternalWalletApp.TREZOR_SUITE, ExternalWalletApp.MYCELIUM, ExternalWalletApp.ELECTRUM,
            ExternalWalletApp.BRAVE_WALLET, ExternalWalletApp.RAINBOW_WALLET, ExternalWalletApp.WALLET_CONNECT,
            ExternalWalletApp.PHANTOM_WALLET, ExternalWalletApp.SOLFLARE_WALLET, ExternalWalletApp.TRON_WALLET,
            ExternalWalletApp.KLEVER_WALLET, ExternalWalletApp.BITKEEP_WALLET, ExternalWalletApp.SAFE_WALLET,
            ExternalWalletApp.ARGENT_WALLET, ExternalWalletApp.ZERION_WALLET, ExternalWalletApp.IM_TOKEN_WALLET,
            ExternalWalletApp.MATH_WALLET, ExternalWalletApp.TOKEN_POCKET
        ];
    }
    static getWalletsForCoin(coinType) {
        return ExternalWalletApp.getAllWalletApps().filter(wallet => wallet.supportedCoins.includes(coinType));
    }
    /**
     * Generate deep link for payment
     */
    generatePaymentDeepLink(address, amount, coinType) {
        const amountStr = amount.toString();
        switch (this.deepLinkScheme) {
            case "trust":
                return `trust://send?address=${address}&amount=${amountStr}&asset=${(0, types_1.getCoinSymbol)(coinType).toLowerCase()}`;
            case "metamask":
                const ethAmount = amount.mul(new bn_js_1.default(1000000000000000000));
                return `metamask://send/?to=${address}&value=${ethAmount.toString()}`;
            case "cbwallet":
                return `cbwallet://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "binance":
                return `binance://payment?address=${address}&amount=${amountStr}&coin=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "exodus":
                return `exodus://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "atomic":
                return `atomic://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "ledgerlive":
                return `ledgerlive://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "trezor":
                return `trezor://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "mycelium":
                return `mycelium://send?address=${address}&amount=${amountStr}`;
            case "electrum":
                return `electrum://send?address=${address}&amount=${amountStr}`;
            case "brave":
                return `brave://wallet?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "rainbow":
                return `rainbow://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "wc":
                return `wc://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "phantom":
                return `phantom://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "solflare":
                return `solflare://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "yoroi":
                return `yoroi://send?address=${address}&amount=${amountStr}`;
            case "adalite":
                return `adalite://send?address=${address}&amount=${amountStr}`;
            case "tronlink":
                return `tronlink://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "klever":
                return `klever://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "bitkeep":
                return `bitkeep://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "safe":
                return `safe://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "argent":
                return `argent://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "zerion":
                return `zerion://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "imtokenv2":
                return `imtokenv2://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "mathwallet":
                return `mathwallet://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            case "tpoutside":
                return `tpoutside://send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
            default:
                return `https://${this.deepLinkScheme}.com/send?address=${address}&amount=${amountStr}&currency=${(0, types_1.getCoinSymbol)(coinType)}`;
        }
    }
    /**
     * Check if wallet app is installed (in browser environment, always return true for SDK purposes)
     */
    isInstalled() {
        // In a real browser/mobile app, this would check if the app is installed
        // For SDK purposes, we'll return true as a default
        return true;
    }
}
exports.ExternalWalletApp = ExternalWalletApp;
// Predefined popular wallet apps
ExternalWalletApp.TRUST_WALLET = new ExternalWalletApp("Trust Wallet", "com.wallet.crypto.trustapp", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.POLYGON,
    types_1.CoinType.BINANCE_COIN
], "trust");
ExternalWalletApp.META_MASK = new ExternalWalletApp("MetaMask", "io.metamask", [types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON, types_1.CoinType.BINANCE_COIN], "metamask");
ExternalWalletApp.COINBASE_WALLET = new ExternalWalletApp("Coinbase Wallet", "com.coinbase.android", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN
], "cbwallet");
ExternalWalletApp.BINANCE_WALLET = new ExternalWalletApp("Binance Wallet", "com.binance.dev", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.POLYGON, types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "binance");
ExternalWalletApp.EXODUS = new ExternalWalletApp("Exodus", "exodusmovement.exodus", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.SOLANA
], "exodus");
ExternalWalletApp.ATOMIC_WALLET = new ExternalWalletApp("Atomic Wallet", "co.atomicwallet", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.POLYGON, types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "atomic");
ExternalWalletApp.LEDGER_LIVE = new ExternalWalletApp("Ledger Live", "com.ledger.live", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.POLYGON,
    types_1.CoinType.BINANCE_COIN, types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "ledgerlive");
ExternalWalletApp.TREZOR_SUITE = new ExternalWalletApp("Trezor Suite", "satoshilabs.trezor.trezor-suite", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.POLYGON,
    types_1.CoinType.BINANCE_COIN
], "trezor");
ExternalWalletApp.MYCELIUM = new ExternalWalletApp("Mycelium", "com.mycelium.wallet", [types_1.CoinType.BITCOIN, types_1.CoinType.LITECOIN, types_1.CoinType.ETHEREUM], "mycelium");
ExternalWalletApp.ELECTRUM = new ExternalWalletApp("Electrum", "org.electrum.electrum", [types_1.CoinType.BITCOIN, types_1.CoinType.LITECOIN, types_1.CoinType.BITCOIN_CASH], "electrum");
ExternalWalletApp.BRAVE_WALLET = new ExternalWalletApp("Brave Wallet", "com.brave.browser", [types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON, types_1.CoinType.BINANCE_COIN], "brave");
ExternalWalletApp.RAINBOW_WALLET = new ExternalWalletApp("Rainbow Wallet", "me.rainbow", [types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON, types_1.CoinType.BINANCE_COIN], "rainbow");
ExternalWalletApp.WALLET_CONNECT = new ExternalWalletApp("WalletConnect", "com.walletconnect", [
    types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "wc");
ExternalWalletApp.PHANTOM_WALLET = new ExternalWalletApp("Phantom Wallet", "app.phantom", [types_1.CoinType.SOLANA, types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON], "phantom");
ExternalWalletApp.SOLFLARE_WALLET = new ExternalWalletApp("Solflare Wallet", "com.solflare.mobile", [types_1.CoinType.SOLANA, types_1.CoinType.ETHEREUM], "solflare");
ExternalWalletApp.TRON_WALLET = new ExternalWalletApp("TronWallet", "com.tronlinkpro.wallet", [types_1.CoinType.TRON, types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM], "tronlink");
ExternalWalletApp.KLEVER_WALLET = new ExternalWalletApp("Klever Wallet", "com.klever.wallet", [types_1.CoinType.TRON, types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN], "klever");
ExternalWalletApp.BITKEEP_WALLET = new ExternalWalletApp("BitKeep Wallet", "com.bitkeep.wallet", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.POLYGON, types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "bitkeep");
ExternalWalletApp.SAFE_WALLET = new ExternalWalletApp("Safe Wallet", "io.gnosis.safe", [types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON, types_1.CoinType.BINANCE_COIN], "safe");
ExternalWalletApp.ARGENT_WALLET = new ExternalWalletApp("Argent Wallet", "io.argent.wallet", [types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON, types_1.CoinType.BINANCE_COIN], "argent");
ExternalWalletApp.ZERION_WALLET = new ExternalWalletApp("Zerion Wallet", "io.zerion.wallet", [
    types_1.CoinType.ETHEREUM, types_1.CoinType.POLYGON, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.SOLANA
], "zerion");
ExternalWalletApp.IM_TOKEN_WALLET = new ExternalWalletApp("imToken Wallet", "im.token.im", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.POLYGON, types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "imtokenv2");
ExternalWalletApp.MATH_WALLET = new ExternalWalletApp("MathWallet", "com.mathwallet.android", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.POLYGON, types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "mathwallet");
ExternalWalletApp.TOKEN_POCKET = new ExternalWalletApp("TokenPocket", "com.tokenpocket.pocket", [
    types_1.CoinType.BITCOIN, types_1.CoinType.ETHEREUM, types_1.CoinType.LITECOIN,
    types_1.CoinType.BITCOIN_CASH, types_1.CoinType.DOGECOIN, types_1.CoinType.BINANCE_COIN,
    types_1.CoinType.POLYGON, types_1.CoinType.SOLANA, types_1.CoinType.TRON
], "tpoutside");
/**
 * Enhanced USD Payment Request with external wallet integration
 */
class UsdPaymentRequestWithWalletSelection {
    constructor(usdPaymentRequest, availableWalletApps, selectedWalletApp, walletSelectionRequired = true) {
        this.usdPaymentRequest = usdPaymentRequest;
        this.availableWalletApps = availableWalletApps;
        this.selectedWalletApp = selectedWalletApp;
        this.walletSelectionRequired = walletSelectionRequired;
    }
    /**
     * Get payment deep link for selected wallet
     */
    getPaymentDeepLink() {
        if (!this.selectedWalletApp) {
            return null;
        }
        return this.selectedWalletApp.generatePaymentDeepLink(this.usdPaymentRequest.customerAddress, this.usdPaymentRequest.cryptoAmount, this.usdPaymentRequest.coinType);
    }
    /**
     * Select wallet app
     */
    selectWallet(walletApp) {
        return new UsdPaymentRequestWithWalletSelection(this.usdPaymentRequest, this.availableWalletApps, walletApp, false);
    }
    /**
     * Get formatted payment info with wallet selection
     */
    getFormattedInfo() {
        const baseInfo = this.usdPaymentRequest.getFormattedInfo();
        const walletInfo = this.selectedWalletApp
            ? `\nBezahlen mit: ${this.selectedWalletApp.name}`
            : "\nBitte wählen Sie eine Wallet-App";
        return baseInfo + walletInfo;
    }
}
exports.UsdPaymentRequestWithWalletSelection = UsdPaymentRequestWithWalletSelection;
/**
 * External Wallet Integration Manager
 */
class ExternalWalletManager {
    /**
     * Create payment request with wallet selection
     */
    createPaymentWithWalletSelection(usdPaymentRequest, coinType) {
        const availableWallets = ExternalWalletApp.getWalletsForCoin(coinType);
        return new UsdPaymentRequestWithWalletSelection(usdPaymentRequest, availableWallets, undefined, availableWallets.length > 0);
    }
    /**
     * Get all supported wallet apps
     */
    getAllSupportedWallets() {
        return ExternalWalletApp.getAllWalletApps();
    }
    /**
     * Get wallet apps for specific cryptocurrency
     */
    getWalletsForCryptocurrency(coinType) {
        return ExternalWalletApp.getWalletsForCoin(coinType);
    }
    /**
     * Generate payment deep link
     */
    generatePaymentDeepLink(walletApp, address, amount, coinType) {
        return walletApp.generatePaymentDeepLink(address, amount, coinType);
    }
    /**
     * Check if wallet app supports specific cryptocurrency
     */
    isCoinSupported(walletApp, coinType) {
        return walletApp.supportedCoins.includes(coinType);
    }
    /**
     * Get wallet app by package name
     */
    getWalletByPackageName(packageName) {
        return ExternalWalletApp.getAllWalletApps().find(wallet => wallet.packageName === packageName);
    }
}
exports.ExternalWalletManager = ExternalWalletManager;
//# sourceMappingURL=ExternalWalletIntegration.js.map