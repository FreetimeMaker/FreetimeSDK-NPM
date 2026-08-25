/**
 * Basic usage example for FreetimeSDK Node.js
 */
import { 
    FreetimePay, 
    DeveloperConfig, 
    PaymentRequest, 
    PaymentSelectionCLI,
    PaymentResultSuccess,
    PaymentResultError,
    PaymentResultCancelled,
    BitcoinProvider,
    EthereumProvider 
} from '../src/index';

async function main() {
    // 1. Create configuration
    const config = new DeveloperConfig('my_developer_id');
    
    // 2. Initialize SDK
    const sdk = new FreetimePay(config);
    
    // 3. Register providers (batch method)
    const addresses = {
        'BTC': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'ETH': '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        'DOGE': 'D5nRy9Tj7J6L6G7s8G9H0J1K2L3M4N5O6P'
    };
    
    sdk.registerDefaultCryptoProviders(addresses);
    
    // Or register individual providers
    // sdk.registerProvider(new BitcoinProvider('your_btc_address'));
    // sdk.registerProvider(new EthereumProvider('your_eth_address'));
    
    // 4. Create payment request
    const request = new PaymentRequest(
        5.0,
        'USD',
        'Premium Support'
    );
    
    // 5. Show payment selection CLI
    console.log('Starting payment selection...');
    const paymentCLI = new PaymentSelectionCLI(sdk);
    
    try {
        const result = await paymentCLI.showPaymentSelection(request);
        
        if (result instanceof PaymentResultSuccess) {
            console.log(`✅ Payment successful! Transaction ID: ${result.transactionId}`);
            console.log(`Amount: ${result.amount}`);
        } else if (result instanceof PaymentResultError) {
            console.log(`❌ Payment failed: ${result.message}`);
            if (result.code) {
                console.log(`Error code: ${result.code}`);
            }
        } else if (result instanceof PaymentResultCancelled) {
            console.log('⚠️ Payment cancelled by user');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
    }
    
    // 6. Programmatic payment processing
    console.log('\nProcessing programmatic payment...');
    sdk.processPayment('Bitcoin (BTC)', request, (result) => {
        if (result instanceof PaymentResultSuccess) {
            console.log(`✅ Programmatic payment successful! Transaction ID: ${result.transactionId}`);
        } else if (result instanceof PaymentResultError) {
            console.log(`❌ Programmatic payment failed: ${result.message}`);
        }
    });
    
    // 7. List available providers
    console.log('\nAvailable providers:');
    const providers = sdk.getAvailableProviders();
    providers.forEach((provider, index) => {
        console.log(`${index + 1}. ${provider.name}`);
    });
}

// Run the example
if (require.main === module) {
    main().catch(console.error);
}

export { main };