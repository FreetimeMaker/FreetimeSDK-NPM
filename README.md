# Freetime Payment SDK - Node.js

A completely self-contained, open-source multi-cryptocurrency payment SDK for Node.js and browsers, ported from the original Android SDK.

## Features

- **Multi-Coin Support**: 9 cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Bitcoin Cash (BCH), Dogecoin (DOGE), Solana (SOL), Polygon (MATIC), Binance Coin (BNB), and Tron (TRX)
- **External Wallet Integration**: Support for 25+ popular wallet apps (Trust Wallet, MetaMask, Coinbase, etc.) with deep link generation
- **Developer Fee System**: Tiered fee structure (0.05% - 0.5%) with app.ncwallet.net-compatible wallets
- **USD Payment Gateway**: Automatic USD to cryptocurrency conversion with real-time rates
- **Production-Ready**: Enhanced security, health monitoring, and statistics
- **Fully Self-Contained**: No external dependencies or API calls required
- **Local Cryptography**: All cryptographic operations performed locally
- **Wallet Management**: Create and manage multiple wallets
- **Transaction Builder**: Create and sign transactions
- **Open Source**: Fully transparent and verifiable code

## Installation

```bash
npm install freetimesdk
```

## Quick Start

### 1. Initialize SDK

```javascript
import { FreetimePaymentSDK, CoinType } from 'freetimesdk';

const sdk = new FreetimePaymentSDK();
```

### 2. Create Wallet

```javascript
// Create Bitcoin wallet
const bitcoinWallet = sdk.createWallet(CoinType.BITCOIN, 'My Bitcoin Wallet');

// Create Ethereum wallet
const ethereumWallet = sdk.createWallet(CoinType.ETHEREUM, 'My Ethereum Wallet');

// Create Litecoin wallet
const litecoinWallet = sdk.createWallet(CoinType.LITECOIN, 'My Litecoin Wallet');
```

### 3. Check Balance

```javascript
const balance = await sdk.getBalance(bitcoinWallet.address);
console.log(`Bitcoin balance: ${balance} BTC`);
```

### 4. Send Cryptocurrency

```javascript
const amount = '0.001';
const recipientAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';

const result = await sdk.send(
  fromAddress = bitcoinWallet.address,
  toAddress = recipientAddress,
  amount = amount,
  coinType = CoinType.BITCOIN
);

// Display fee breakdown
console.log(result.feeBreakdown.getFormattedBreakdown());

// Broadcast the transaction
const txHash = await result.broadcast();
console.log(`Transaction sent: ${txHash}`);
```

### 5. Fee Estimation

```javascript
const fee = await sdk.getFeeEstimate(
  fromAddress = bitcoinWallet.address,
  toAddress = recipientAddress,
  amount = amount,
  coinType = CoinType.BITCOIN
);

console.log(`Estimated fee: ${fee} BTC`);
```

### 6. Send Cryptocurrency with Developer Fees

```javascript
// Send cryptocurrency with automatic fee calculation
const result = await sdk.send(
  fromAddress = bitcoinWallet.address,
  toAddress = recipientAddress,
  amount = '0.1',
  coinType = CoinType.BITCOIN
);

// Display fee breakdown
console.log(result.feeBreakdown.getFormattedBreakdown());

/* Transaction Fee Breakdown (BTC):
Original Amount: 0.10000000 BTC
Network Fee: 0.00000100 BTC
Developer Fee (0.5%): 0.00050000 BTC
Total Fee: 0.00050100 BTC
Recipient Receives: 0.09949900 BTC
Developer Wallet: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
*/

// Broadcast the transaction
const txHash = await result.broadcast();
console.log(`Transaction sent: ${txHash}`);
```

### 7. External Wallet Integration

```javascript
import { 
  UsdPaymentGateway, 
  ExternalWalletApp, 
  CoinType 
} from 'freetimesdk';

// Create USD Payment Gateway with external wallet support
const gateway = new UsdPaymentGateway(
  merchantWalletAddress: 'your-merchant-address',
  merchantCoinType: CoinType.BITCOIN
);

// Create payment with wallet selection
const paymentWithWallets = await gateway.createUsdPaymentWithWalletSelection(
  usdAmount: new BN(10000), // $100.00 USD (in cents)
  customerReference: 'order-123',
  description: 'Payment for goods'
);

// Get available wallet apps
const availableWallets = paymentWithWallets.availableWalletApps;
console.log('Available wallets:', availableWallets.map(w => w.name));

// Select a wallet (e.g., Trust Wallet)
const selectedPayment = paymentWithWallets.selectWallet(ExternalWalletApp.TRUST_WALLET);

// Generate deep link for payment
const deepLink = selectedPayment.getPaymentDeepLink();
console.log('Payment deep link:', deepLink);

// Open wallet app with deep link
window.open(deepLink);

// Example deep link outputs:
// Trust Wallet: "trust://send?address=bc1q...&amount=0.001&asset=btc"
// MetaMask: "metamask://send/?to=0x742d...&value=1000000000000000"
// Coinbase: "cbwallet://send?address=bc1q...&amount=0.001&currency=BTC"
```

### 8. USD Payment Gateway

```javascript
import { UsdPaymentGateway, CoinType } from 'freetimesdk';
import BN from 'bn.js';

const gateway = new UsdPaymentGateway(
  'merchant-bitcoin-address',
  CoinType.BITCOIN
);

// Create USD payment request
const payment = await gateway.createUsdPaymentRequest(
  new BN(5000), // $50.00 USD
  'customer-123',
  'Monthly subscription'
);

console.log(payment.getFormattedInfo());
// Output: "$50.00 USD = 0.00215000 BTC (Rate: $23255.81)"

// Check payment status
const status = await gateway.checkUsdPaymentStatus(payment.id);
console.log('Payment status:', status);

// Get payment details
const details = gateway.getUsdPaymentDetails(payment.id);
console.log('Current balance:', details?.currentUsdValue);
```

## API Reference

### FreetimePaymentSDK

The main class for interacting with the payment SDK.

#### Methods

- `createWallet(coinType: CoinType, name?: string): Wallet` - Creates a new wallet
- `getBalance(address: string): Promise<string>` - Gets the balance of an address
- `send(fromAddress: string, toAddress: string, amount: string, coinType: CoinType): Promise<TransactionWithFees>` - Sends cryptocurrency with fee calculation
- `getFeeEstimate(...): Promise<string>` - Estimates transaction fee
- `getFeeManager(): FeeManager` - Gets the fee manager for developer fee configuration
- `getAllWallets(): Wallet[]` - Returns all wallets
- `getWalletsByCoinType(coinType: CoinType): Wallet[]` - Returns wallets by type
- `validateAddress(address: string, coinType: CoinType): boolean` - Validates an address

### Wallet

Represents a cryptocurrency wallet.

#### Properties

- `address: string` - The wallet address
- `coinType: CoinType` - The cryptocurrency type
- `publicKey: string` - The public key
- `privateKey: string` - The private key (keep secure!)

#### Methods

- `getBalance(paymentProvider: PaymentInterface): Promise<string>` - Check balance
- `send(toAddress: string, amount: string, paymentProvider: PaymentInterface): Promise<Transaction>` - Send

### TransactionWithFees

Represents a cryptocurrency transaction with fee breakdown.

#### Properties

- `transaction: Transaction` - The transaction details
- `feeBreakdown: FeeBreakdown` - Detailed fee information

#### Methods

- `broadcast(): Promise<string>` - Broadcasts the transaction to the network
- `getFormattedSummary(): string` - Gets formatted transaction summary

### FeeManager

Manages developer fees and wallet configuration.

#### Methods

- `getDeveloperFeePercentage(amount: string): string` - Gets fee percentage for amount
- `getFeeTier(amount: string): string` - Gets transaction tier information
- `getDeveloperWalletAddress(coinType: CoinType): string` - Gets developer wallet for cryptocurrency
- `getAllDeveloperWallets(): Map<CoinType, string>` - Gets all developer wallets
- `updateDeveloperWallet(coinType: CoinType, address: string): FeeManager` - Updates developer wallet
- `updateAllDeveloperWallets(wallets: Map<CoinType, string>): FeeManager` - Updates all developer wallets

### UsdPaymentGateway

Enhanced payment gateway with USD support and external wallet integration.

#### Constructor

- `new UsdPaymentGateway(merchantWalletAddress: string, merchantCoinType: CoinType)` - Creates a new payment gateway

#### Methods

- `createUsdPaymentRequest(usdAmount: BN, customerReference?: string, description?: string): Promise<UsdPaymentRequest>` - Creates a USD payment request
- `createUsdPaymentWithWalletSelection(...): Promise<UsdPaymentRequestWithWalletSelection>` - Creates payment with wallet selection
- `checkUsdPaymentStatus(paymentId: string): Promise<PaymentStatus>` - Checks payment status
- `getUsdPaymentDetails(paymentId: string): UsdPaymentDetails | null` - Gets payment details
- `getCurrentExchangeRates(): Promise<Map<CoinType, BN>>` - Gets current exchange rates
- `getAvailableWalletApps(): ExternalWalletApp[]` - Gets available wallet apps
- `generatePaymentDeepLink(walletApp: ExternalWalletApp, usdPaymentRequest: UsdPaymentRequest): string` - Generates payment deep link
- `isWalletSupported(walletApp: ExternalWalletApp): boolean` - Checks if wallet is supported

### ExternalWalletApp

Represents an external wallet application with deep link support.

#### Properties

- `name: string` - Wallet app name
- `packageName: string` - Package name for the app
- `supportedCoins: CoinType[]` - Supported cryptocurrencies
- `deepLinkScheme: string` - Deep link scheme

#### Methods

- `generatePaymentDeepLink(address: string, amount: BN, coinType: CoinType): string` - Generates deep link
- `isInstalled(): boolean` - Checks if wallet is installed

#### Predefined Wallet Apps

- `ExternalWalletApp.TRUST_WALLET` - Trust Wallet
- `ExternalWalletApp.META_MASK` - MetaMask
- `ExternalWalletApp.COINBASE_WALLET` - Coinbase Wallet
- `ExternalWalletApp.BINANCE_WALLET` - Binance Wallet
- `ExternalWalletApp.EXODUS` - Exodus
- `ExternalWalletApp.ATOMIC_WALLET` - Atomic Wallet
- And 20+ more wallet apps

### ExternalWalletManager

Manages external wallet operations and selection.

#### Methods

- `createPaymentWithWalletSelection(usdPaymentRequest: UsdPaymentRequest, coinType: CoinType): UsdPaymentRequestWithWalletSelection` - Creates payment with wallet selection
- `getAllSupportedWallets(): ExternalWalletApp[]` - Gets all supported wallets
- `getWalletsForCryptocurrency(coinType: CoinType): ExternalWalletApp[]` - Gets wallets for specific cryptocurrency
- `generatePaymentDeepLink(walletApp: ExternalWalletApp, address: string, amount: BN, coinType: CoinType): string` - Generates deep link
- `isCoinSupported(walletApp: ExternalWalletApp, coinType: CoinType): boolean` - Checks coin support

### UsdPaymentRequestWithWalletSelection

Enhanced payment request with external wallet integration.

#### Properties

- `usdPaymentRequest: UsdPaymentRequest` - Base payment request
- `availableWalletApps: ExternalWalletApp[]` - Available wallet apps
- `selectedWalletApp?: ExternalWalletApp` - Selected wallet app
- `walletSelectionRequired: boolean` - Whether wallet selection is required

#### Methods

- `getPaymentDeepLink(): string | null` - Gets payment deep link for selected wallet
- `selectWallet(walletApp: ExternalWalletApp): UsdPaymentRequestWithWalletSelection` - Selects a wallet app
- `getFormattedInfo(): string` - Gets formatted payment info

## Developer Fees

The SDK implements a tiered fee structure to support ongoing development:

| Transaction Amount | Fee Percentage | Tier |
|-------------------|----------------|------|
| >= 1000 | 0.05% | Enterprise |
| >= 100 | 0.1% | Business |
| >= 10 | 0.25% | Professional |
| >= 1 | 0.35% | Standard |
| >= 0.1 | 0.4% | Basic |
| < 0.1 | 0.5% | Micro |

### Fee Management

```javascript
const feeManager = sdk.getFeeManager();

// Get current fee percentage
const feePercentage = feeManager.getDeveloperFeePercentage('1.5');
console.log(`Fee percentage: ${feePercentage}%`);

// Get fee tier
const tier = feeManager.getFeeTier('1.5');
console.log(`Tier: ${tier}`);

// Update developer wallet
feeManager.updateDeveloperWallet(CoinType.BITCOIN, 'new-developer-wallet-address');
```

## Supported Cryptocurrencies

- **Bitcoin (BTC)** - The original cryptocurrency
- **Ethereum (ETH)** - Smart contract platform
- **Litecoin (LTC)** - Faster Bitcoin alternative
- **Bitcoin Cash (BCH)** - Bitcoin fork with larger blocks
- **Dogecoin (DOGE)** - Popular meme cryptocurrency
- **Solana (SOL)** - High-performance blockchain
- **Polygon (MATIC)** - Ethereum scaling solution
- **Binance Coin (BNB)** - Exchange token
- **Tron (TRX)** - Decentralized entertainment platform

## Supported External Wallets

The SDK supports 25+ popular wallet applications with automatic deep link generation:

### Major Wallets
- **Trust Wallet** - Multi-currency wallet with dApp browser
- **MetaMask** - Popular Ethereum wallet and dApp browser
- **Coinbase Wallet** - Coinbase's self-custody wallet
- **Binance Wallet** - Binance's official wallet
- **Exodus** - User-friendly desktop and mobile wallet

### Hardware Wallets
- **Ledger Live** - Ledger's companion app
- **Trezor Suite** - Trezor's desktop wallet

### Specialized Wallets
- **Atomic Wallet** - Multi-asset wallet with atomic swaps
- **Mycelium** - Bitcoin-focused Android wallet
- **Electrum** - Lightweight Bitcoin wallet
- **Phantom** - Solana ecosystem wallet
- **Solflare** - Solana wallet with Web3 support
- **Rainbow** - Ethereum wallet with social features
- **Safe** - Multi-signature wallet
- **Argent** - Layer 2 Ethereum wallet
- **Zerion** - DeFi-focused wallet

### Exchange Wallets
- **Binance Wallet** - Exchange-integrated wallet
- **Coinbase Wallet** - Exchange self-custody option

### Mobile-First Wallets
- **imToken** - Asian market leader
- **MathWallet** - Multi-chain wallet
- **TokenPocket** - Comprehensive dApp ecosystem
- **TronWallet** - Tron ecosystem wallet
- **Klever Wallet** - Tron-focused wallet
- **BitKeep Wallet** - Global multi-chain wallet

### Browser Wallets
- **Brave Wallet** - Built into Brave browser
- **WalletConnect** - Wallet connection protocol

Each wallet app supports different cryptocurrencies and generates appropriate deep links for payment processing.

## Security

- All cryptographic operations are performed locally
- Private keys never leave your application
- Address validation for all supported cryptocurrencies
- Secure random number generation for wallet creation

## Production Environment

For production use, ensure you:

1. Store private keys securely (consider using hardware wallets)
2. Implement proper error handling
3. Use HTTPS for all network communications
4. Validate all user inputs
5. Monitor transaction status

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, please open an issue on the GitHub repository or contact the Freetime Maker team.

## About

This is the official Node.js port of the Freetime Payment SDK. For the original Android version, visit [FreetimeMaker/FreetimeSDK](https://github.com/FreetimeMaker/FreetimeSDK).

## Changelog

### v1.0.3 (February 9, 2026)
- ✨ **NEW**: External Wallet Integration with 25+ wallet apps
- ✨ **NEW**: USD Payment Gateway with automatic crypto conversion
- ✨ **NEW**: Deep link generation for all major wallet apps
- ✨ **NEW**: Wallet selection UI components
- ✨ **NEW**: Support for Trust Wallet, MetaMask, Coinbase, etc.
- 📱 **ENHANCEMENT**: Mobile wallet app detection
- 🔗 **ENHANCEMENT**: Automatic deep link routing
- 📚 **DOCS**: Updated documentation with examples

### v1.0.2 (Previous)
- 🎉 Initial release with core SDK functionality
- 💰 Multi-cryptocurrency support (9 coins)
- 🔐 Developer fee system
- 📊 Transaction fee estimation
- 🛡️ Production-ready security features
