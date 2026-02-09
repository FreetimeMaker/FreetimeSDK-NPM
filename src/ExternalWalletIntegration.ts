import { CoinType, getCoinSymbol } from './types';
import BN from 'bn.js';

// Interface for UsdPaymentRequest to avoid circular imports
interface IUsdPaymentRequest {
    customerAddress: string;
    cryptoAmount: BN;
    coinType: CoinType;
    getFormattedInfo(): string;
}

/**
 * External wallet app integration for crypto payments
 */
export class ExternalWalletApp {
    constructor(
        public readonly name: string,
        public readonly packageName: string,
        public readonly supportedCoins: CoinType[],
        public readonly deepLinkScheme: string,
        public readonly iconUrl?: string
    ) {}

    // Predefined popular wallet apps
    static readonly TRUST_WALLET = new ExternalWalletApp(
        "Trust Wallet",
        "com.wallet.crypto.trustapp",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.POLYGON,
            CoinType.BINANCE_COIN
        ],
        "trust"
    );
    
    static readonly META_MASK = new ExternalWalletApp(
        "MetaMask",
        "io.metamask",
        [CoinType.ETHEREUM, CoinType.POLYGON, CoinType.BINANCE_COIN],
        "metamask"
    );
    
    static readonly COINBASE_WALLET = new ExternalWalletApp(
        "Coinbase Wallet",
        "com.coinbase.android",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN
        ],
        "cbwallet"
    );
    
    static readonly BINANCE_WALLET = new ExternalWalletApp(
        "Binance Wallet",
        "com.binance.dev",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.BINANCE_COIN,
            CoinType.POLYGON, CoinType.SOLANA, CoinType.TRON
        ],
        "binance"
    );
    
    static readonly EXODUS = new ExternalWalletApp(
        "Exodus",
        "exodusmovement.exodus",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.SOLANA
        ],
        "exodus"
    );
    
    static readonly ATOMIC_WALLET = new ExternalWalletApp(
        "Atomic Wallet",
        "co.atomicwallet",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.BINANCE_COIN,
            CoinType.POLYGON, CoinType.SOLANA, CoinType.TRON
        ],
        "atomic"
    );
    
    static readonly LEDGER_LIVE = new ExternalWalletApp(
        "Ledger Live",
        "com.ledger.live",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.POLYGON,
            CoinType.BINANCE_COIN, CoinType.SOLANA, CoinType.TRON
        ],
        "ledgerlive"
    );
    
    static readonly TREZOR_SUITE = new ExternalWalletApp(
        "Trezor Suite",
        "satoshilabs.trezor.trezor-suite",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.POLYGON,
            CoinType.BINANCE_COIN
        ],
        "trezor"
    );
    
    static readonly MYCELIUM = new ExternalWalletApp(
        "Mycelium",
        "com.mycelium.wallet",
        [CoinType.BITCOIN, CoinType.LITECOIN, CoinType.ETHEREUM],
        "mycelium"
    );
    
    static readonly ELECTRUM = new ExternalWalletApp(
        "Electrum",
        "org.electrum.electrum",
        [CoinType.BITCOIN, CoinType.LITECOIN, CoinType.BITCOIN_CASH],
        "electrum"
    );
    
    static readonly BRAVE_WALLET = new ExternalWalletApp(
        "Brave Wallet",
        "com.brave.browser",
        [CoinType.ETHEREUM, CoinType.POLYGON, CoinType.BINANCE_COIN],
        "brave"
    );
    
    static readonly RAINBOW_WALLET = new ExternalWalletApp(
        "Rainbow Wallet",
        "me.rainbow",
        [CoinType.ETHEREUM, CoinType.POLYGON, CoinType.BINANCE_COIN],
        "rainbow"
    );
    
    static readonly WALLET_CONNECT = new ExternalWalletApp(
        "WalletConnect",
        "com.walletconnect",
        [
            CoinType.ETHEREUM, CoinType.POLYGON, CoinType.BINANCE_COIN,
            CoinType.SOLANA, CoinType.TRON
        ],
        "wc"
    );
    
    static readonly PHANTOM_WALLET = new ExternalWalletApp(
        "Phantom Wallet",
        "app.phantom",
        [CoinType.SOLANA, CoinType.ETHEREUM, CoinType.POLYGON],
        "phantom"
    );
    
    static readonly SOLFLARE_WALLET = new ExternalWalletApp(
        "Solflare Wallet",
        "com.solflare.mobile",
        [CoinType.SOLANA, CoinType.ETHEREUM],
        "solflare"
    );
    
    static readonly TRON_WALLET = new ExternalWalletApp(
        "TronWallet",
        "com.tronlinkpro.wallet",
        [CoinType.TRON, CoinType.BITCOIN, CoinType.ETHEREUM],
        "tronlink"
    );
    
    static readonly KLEVER_WALLET = new ExternalWalletApp(
        "Klever Wallet",
        "com.klever.wallet",
        [CoinType.TRON, CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN],
        "klever"
    );
    
    static readonly BITKEEP_WALLET = new ExternalWalletApp(
        "BitKeep Wallet",
        "com.bitkeep.wallet",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.BINANCE_COIN,
            CoinType.POLYGON, CoinType.SOLANA, CoinType.TRON
        ],
        "bitkeep"
    );
    
    static readonly SAFE_WALLET = new ExternalWalletApp(
        "Safe Wallet",
        "io.gnosis.safe",
        [CoinType.ETHEREUM, CoinType.POLYGON, CoinType.BINANCE_COIN],
        "safe"
    );
    
    static readonly ARGENT_WALLET = new ExternalWalletApp(
        "Argent Wallet",
        "io.argent.wallet",
        [CoinType.ETHEREUM, CoinType.POLYGON, CoinType.BINANCE_COIN],
        "argent"
    );
    
    static readonly ZERION_WALLET = new ExternalWalletApp(
        "Zerion Wallet",
        "io.zerion.wallet",
        [
            CoinType.ETHEREUM, CoinType.POLYGON, CoinType.BINANCE_COIN,
            CoinType.SOLANA
        ],
        "zerion"
    );
    
    static readonly IM_TOKEN_WALLET = new ExternalWalletApp(
        "imToken Wallet",
        "im.token.im",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.BINANCE_COIN,
            CoinType.POLYGON, CoinType.SOLANA, CoinType.TRON
        ],
        "imtokenv2"
    );
    
    static readonly MATH_WALLET = new ExternalWalletApp(
        "MathWallet",
        "com.mathwallet.android",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.BINANCE_COIN,
            CoinType.POLYGON, CoinType.SOLANA, CoinType.TRON
        ],
        "mathwallet"
    );
    
    static readonly TOKEN_POCKET = new ExternalWalletApp(
        "TokenPocket",
        "com.tokenpocket.pocket",
        [
            CoinType.BITCOIN, CoinType.ETHEREUM, CoinType.LITECOIN,
            CoinType.BITCOIN_CASH, CoinType.DOGECOIN, CoinType.BINANCE_COIN,
            CoinType.POLYGON, CoinType.SOLANA, CoinType.TRON
        ],
        "tpoutside"
    );

    static getAllWalletApps(): ExternalWalletApp[] {
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
    
    static getWalletsForCoin(coinType: CoinType): ExternalWalletApp[] {
        return ExternalWalletApp.getAllWalletApps().filter(wallet => 
            wallet.supportedCoins.includes(coinType)
        );
    }
    
    /**
     * Generate deep link for payment
     */
    generatePaymentDeepLink(address: string, amount: BN, coinType: CoinType): string {
        const amountStr = amount.toString();
        
        switch (this.deepLinkScheme) {
            case "trust":
                return `trust://send?address=${address}&amount=${amountStr}&asset=${getCoinSymbol(coinType).toLowerCase()}`;
            case "metamask":
                const ethAmount = amount.mul(new BN(1000000000000000000));
                return `metamask://send/?to=${address}&value=${ethAmount.toString()}`;
            case "cbwallet":
                return `cbwallet://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "binance":
                return `binance://payment?address=${address}&amount=${amountStr}&coin=${getCoinSymbol(coinType)}`;
            case "exodus":
                return `exodus://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "atomic":
                return `atomic://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "ledgerlive":
                return `ledgerlive://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "trezor":
                return `trezor://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "mycelium":
                return `mycelium://send?address=${address}&amount=${amountStr}`;
            case "electrum":
                return `electrum://send?address=${address}&amount=${amountStr}`;
            case "brave":
                return `brave://wallet?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "rainbow":
                return `rainbow://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "wc":
                return `wc://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "phantom":
                return `phantom://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "solflare":
                return `solflare://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "yoroi":
                return `yoroi://send?address=${address}&amount=${amountStr}`;
            case "adalite":
                return `adalite://send?address=${address}&amount=${amountStr}`;
            case "tronlink":
                return `tronlink://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "klever":
                return `klever://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "bitkeep":
                return `bitkeep://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "safe":
                return `safe://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "argent":
                return `argent://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "zerion":
                return `zerion://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "imtokenv2":
                return `imtokenv2://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "mathwallet":
                return `mathwallet://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            case "tpoutside":
                return `tpoutside://send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
            default:
                return `https://${this.deepLinkScheme}.com/send?address=${address}&amount=${amountStr}&currency=${getCoinSymbol(coinType)}`;
        }
    }
    
    /**
     * Check if wallet app is installed (in browser environment, always return true for SDK purposes)
     */
    isInstalled(): boolean {
        // In a real browser/mobile app, this would check if the app is installed
        // For SDK purposes, we'll return true as a default
        return true;
    }
}

/**
 * Enhanced USD Payment Request with external wallet integration
 */
export class UsdPaymentRequestWithWalletSelection {
    constructor(
        public readonly usdPaymentRequest: IUsdPaymentRequest,
        public readonly availableWalletApps: ExternalWalletApp[],
        public readonly selectedWalletApp?: ExternalWalletApp,
        public readonly walletSelectionRequired: boolean = true
    ) {}

    /**
     * Get payment deep link for selected wallet
     */
    getPaymentDeepLink(): string | null {
        if (!this.selectedWalletApp) {
            return null;
        }
        
        return this.selectedWalletApp.generatePaymentDeepLink(
            this.usdPaymentRequest.customerAddress,
            this.usdPaymentRequest.cryptoAmount,
            this.usdPaymentRequest.coinType
        );
    }
    
    /**
     * Select wallet app
     */
    selectWallet(walletApp: ExternalWalletApp): UsdPaymentRequestWithWalletSelection {
        return new UsdPaymentRequestWithWalletSelection(
            this.usdPaymentRequest,
            this.availableWalletApps,
            walletApp,
            false
        );
    }
    
    /**
     * Get formatted payment info with wallet selection
     */
    getFormattedInfo(): string {
        const baseInfo = this.usdPaymentRequest.getFormattedInfo();
        const walletInfo = this.selectedWalletApp 
            ? `\nBezahlen mit: ${this.selectedWalletApp.name}`
            : "\nBitte wählen Sie eine Wallet-App";
        return baseInfo + walletInfo;
    }
}

/**
 * External Wallet Integration Manager
 */
export class ExternalWalletManager {
    
    /**
     * Create payment request with wallet selection
     */
    createPaymentWithWalletSelection(
        usdPaymentRequest: IUsdPaymentRequest,
        coinType: CoinType
    ): UsdPaymentRequestWithWalletSelection {
        const availableWallets = ExternalWalletApp.getWalletsForCoin(coinType);
        
        return new UsdPaymentRequestWithWalletSelection(
            usdPaymentRequest,
            availableWallets,
            undefined,
            availableWallets.length > 0
        );
    }
    
    /**
     * Get all supported wallet apps
     */
    getAllSupportedWallets(): ExternalWalletApp[] {
        return ExternalWalletApp.getAllWalletApps();
    }
    
    /**
     * Get wallet apps for specific cryptocurrency
     */
    getWalletsForCryptocurrency(coinType: CoinType): ExternalWalletApp[] {
        return ExternalWalletApp.getWalletsForCoin(coinType);
    }
    
    /**
     * Generate payment deep link
     */
    generatePaymentDeepLink(
        walletApp: ExternalWalletApp,
        address: string,
        amount: BN,
        coinType: CoinType
    ): string {
        return walletApp.generatePaymentDeepLink(address, amount, coinType);
    }
    
    /**
     * Check if wallet app supports specific cryptocurrency
     */
    isCoinSupported(walletApp: ExternalWalletApp, coinType: CoinType): boolean {
        return walletApp.supportedCoins.includes(coinType);
    }
    
    /**
     * Get wallet app by package name
     */
    getWalletByPackageName(packageName: string): ExternalWalletApp | undefined {
        return ExternalWalletApp.getAllWalletApps().find(wallet => 
            wallet.packageName === packageName
        );
    }
}
