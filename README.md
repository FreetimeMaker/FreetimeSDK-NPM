# Freetime Multi-Provider Payment SDK - Node.js

A Node.js version of the FreetimeSDK Android SDK - a multi-provider payment SDK that enables integration of real payment providers without relying on proprietary binary blobs. Fully open-source, serverless, and ideal for F-Droid-friendly applications.

## Features

- **F-Droid Friendly**: No proprietary SDKs. Uses URI schemes and web flows.
- **Serverless**: Designed to work without any backend infrastructure.
- **Promotion System**: Display "Featured Projects" anywhere in your app. Privacy-friendly and fully configurable.
- **Real Providers**: Supports a wide range of Cryptocurrencies.
- **Crypto-Ready**: Native support for 30+ major cryptocurrencies and Layer 2s (BTC, ETH, SOL, OP, ARB, BASE, etc.).
- **Cross-Platform**: Works in Node.js and browser environments.
- **TypeScript**: Fully typed for excellent developer experience.

## Installation

```bash
npm install freetimesdk
```

## Quick Start

### 1. Configuration

```typescript
import { FreetimePay, DeveloperConfig } from 'freetimesdk';

const config = new DeveloperConfig('your_developer_id');
const sdk = new FreetimePay(config);
```

### 2. Register Providers

#### Batch Registration for Crypto

The easiest way to register all supported cryptocurrencies is using a map of your addresses:

```typescript
const addresses = {
    'BTC': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    'ETH': '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    'SOL': '7p2...',
    'XMR': '44AFFq...',
    // ... add any other addresses for the tokens you wish to support
};

sdk.registerDefaultCryptoProviders(addresses);
```

#### Manual Registration

You can still register providers individually if needed:

```typescript
import { BitcoinProvider, EthereumProvider } from 'freetimesdk';

sdk.registerProvider(new BitcoinProvider('BTC_ADDRESS'));
sdk.registerProvider(new EthereumProvider('ETH_ADDRESS'));
```

### 3. Start Payment (CLI)

```typescript
import { PaymentRequest, PaymentSelectionCLI } from 'freetimesdk';

const request = new PaymentRequest(
    5.0,
    'USD',
    'Premium Support'
);

const paymentCLI = new PaymentSelectionCLI(sdk);
const result = await paymentCLI.showPaymentSelection(request);

if (result instanceof PaymentResultSuccess) {
    console.log(`Success! Transaction ID: ${result.transactionId}`);
} else if (result instanceof PaymentResultError) {
    console.log(`Error: ${result.message}`);
} else if (result instanceof PaymentResultCancelled) {
    console.log('User cancelled');
}
```

### 4. Start Payment (Programmatic)

```typescript
import { PaymentRequest } from 'freetimesdk';

const request = new PaymentRequest(
    5.0,
    'USD',
    'Premium Support'
);

sdk.processPayment('Bitcoin (BTC)', request, (result) => {
    if (result instanceof PaymentResultSuccess) {
        console.log(`Success! Transaction ID: ${result.transactionId}`);
    } else if (result instanceof PaymentResultError) {
        console.log(`Error: ${result.message}`);
    } else if (result instanceof PaymentResultCancelled) {
        console.log('User cancelled');
    }
});
```

## Promotion System

The SDK includes a flexible promotion system to monetize your app ethically.

### Default Behavior

By default, promotions are shown at the bottom of the payment selection interface.

### Custom Promotion URL

Developers can provide their own JSON list of promotions:

```typescript
const config = new DeveloperConfig(
    'your_developer_id',
    true, // enable promotions
    'https://your-server.com/promotions.json' // custom promotion URL
);
```

### Opt-out

You can disable promotions entirely:

```typescript
const config = new DeveloperConfig(
    'your_developer_id',
    false // disable promotions
);
```

### Promotion JSON Format

```json
{
  "version": 1,
  "promotions": [
    {
      "id": "promo_1",
      "title": "Featured App",
      "description": "Check out this amazing app!",
      "iconUrl": "https://example.com/icon.png",
      "targetUrl": "https://example.com"
    }
  ]
}
```

## Supported Providers

### Cryptocurrencies

Comprehensive support for 32 major assets and networks:

**Legacy/Major**: BTC, ETH, DOGE, LTC, BCH, TRX, XLM, DASH, ZEC, XMR, XRP

**High Performance L1s**: SOL, ADA, DOT, ALGO, ATOM, NEAR, EGLD, HBAR, APT, SUI, VET, XTZ

**Layer 2s & EVMs**: OP, ARB, BASE, CELO, AVAX, MATIC, FTM

**Exchange/Native**: BNB, XNO

## API Reference

### FreetimePay

The main entry point for the Freetime SDK.

#### Constructor

- `new FreetimePay(config: DeveloperConfig)` - Creates a new FreetimePay instance

#### Methods

- `registerProvider(provider: PaymentProvider): void` - Registers a payment provider
- `registerDefaultCryptoProviders(addresses: Record<string, string>): void` - Registers all default crypto providers
- `getAvailableProviders(): PaymentProvider[]` - Returns the list of available providers
- `processPayment(providerName: string, request: PaymentRequest, onResult: (result: PaymentResult) => void): void` - Processes a payment with the selected provider
- `showPaymentSheet(request: PaymentRequest): Promise<PaymentResult>` - Shows a payment selection interface

### DeveloperConfig

Configuration for the SDK.

#### Constructor

- `new DeveloperConfig(developerId: string, enablePromotions?: boolean, customPromotionUrl?: string | null, hideDefaultPromotions?: boolean)`

#### Properties

- `developerId: string` - Your unique developer identifier
- `enablePromotions: boolean` - Whether to enable the promotion system (default: true)
- `customPromotionUrl: string | null` - Custom URL for promotion JSON (default: null)
- `hideDefaultPromotions: boolean` - Whether to hide default promotions (default: false)

### PaymentRequest

Represents a payment request.

#### Constructor

- `new PaymentRequest(amount: number, currency: string, description: string, metadata?: Record<string, string>)`

#### Properties

- `amount: number` - The amount to be paid
- `currency: string` - The currency code (e.g., "USD", "EUR")
- `description: string` - Description of the purchase
- `metadata: Record<string, string>` - Additional metadata

### PaymentResult

Result of a payment operation. Can be one of:

- `PaymentResultSuccess` - Successful payment with transaction ID and amount
- `PaymentResultError` - Failed payment with error message and optional code
- `PaymentResultCancelled` - User cancelled the payment

### PaymentProvider

Interface for all payment providers.

#### Properties

- `name: string` - The provider name

#### Methods

- `processPayment(request: PaymentRequest, onResult: (result: PaymentResult) => void): void` - Initiates the payment process

### PaymentSelectionCLI

CLI-based payment selection interface for Node.js environments.

#### Constructor

- `new PaymentSelectionCLI(sdk: FreetimePay)` - Creates a new CLI payment selection interface

#### Methods

- `showPaymentSelection(request: PaymentRequest): Promise<PaymentResult>` - Shows an interactive payment selection interface
- `close(): void` - Closes the readline interface

### PromotionManager

Manages promotion fetching and display.

#### Static Methods

- `fetchPromotion(config: DeveloperConfig): Promise<Promotion | null>` - Fetches a random promotion

### Promotion

Represents a promotional item.

#### Properties

- `id: string` - Unique identifier
- `title: string` - Promotion title
- `description: string` - Promotion description
- `iconUrl: string` - URL to promotion icon
- `targetUrl: string` - URL to promotion target

## License

Apache-2.0

## About

The Official Payment SDK from Freetime Maker - Node.js version ported from the original Android SDK.