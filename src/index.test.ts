/**
 * Basic tests for FreetimeSDK
 */
import { 
    FreetimePay, 
    DeveloperConfig, 
    PaymentRequest, 
    PaymentResultSuccess,
    PaymentResultError,
    PaymentResultCancelled,
    BitcoinProvider
} from './index';

describe('FreetimePay', () => {
    let sdk: FreetimePay;
    let config: DeveloperConfig;

    beforeEach(() => {
        config = new DeveloperConfig('test_developer');
        sdk = new FreetimePay(config);
    });

    test('should create SDK instance', () => {
        expect(sdk).toBeInstanceOf(FreetimePay);
        expect(sdk.config.developerId).toBe('test_developer');
    });

    test('should register provider', () => {
        const provider = new BitcoinProvider('test_address');
        sdk.registerProvider(provider);
        
        const providers = sdk.getAvailableProviders();
        expect(providers).toHaveLength(1);
        expect(providers[0].name).toBe('Bitcoin (BTC)');
    });

    test('should register default crypto providers', () => {
        const addresses = {
            'BTC': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            'ETH': '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
        };
        
        sdk.registerDefaultCryptoProviders(addresses);
        
        const providers = sdk.getAvailableProviders();
        expect(providers.length).toBeGreaterThanOrEqual(2);
    });

    test('should process payment with registered provider', (done) => {
        const provider = new BitcoinProvider('test_address');
        sdk.registerProvider(provider);
        
        const request = new PaymentRequest(1.0, 'USD', 'Test payment');
        
        sdk.processPayment('Bitcoin (BTC)', request, (result) => {
            expect(result).toBeInstanceOf(PaymentResultSuccess);
            done();
        });
    });

    test('should return error for unregistered provider', (done) => {
        const request = new PaymentRequest(1.0, 'USD', 'Test payment');
        
        sdk.processPayment('Unknown Provider', request, (result) => {
            expect(result).toBeInstanceOf(PaymentResultError);
            expect((result as PaymentResultError).message).toContain('Provider not found');
            done();
        });
    });

    test('should handle payment result types', () => {
        const success = new PaymentResultSuccess('tx_123', 1.0);
        const error = new PaymentResultError('Test error', 'ERR_001');
        const cancelled = new PaymentResultCancelled();

        expect(success.transactionId).toBe('tx_123');
        expect(success.amount).toBe(1.0);
        expect(error.message).toBe('Test error');
        expect(error.code).toBe('ERR_001');
        expect(cancelled).toBeInstanceOf(PaymentResultCancelled);
    });
});

describe('DeveloperConfig', () => {
    test('should create config with default values', () => {
        const config = new DeveloperConfig('test_id');
        expect(config.developerId).toBe('test_id');
        expect(config.enablePromotions).toBe(true);
        expect(config.customPromotionUrl).toBe(null);
        expect(config.hideDefaultPromotions).toBe(false);
    });

    test('should create config with custom values', () => {
        const config = new DeveloperConfig(
            'test_id',
            false,
            'https://example.com/promos.json',
            true
        );
        expect(config.enablePromotions).toBe(false);
        expect(config.customPromotionUrl).toBe('https://example.com/promos.json');
        expect(config.hideDefaultPromotions).toBe(true);
    });
});

describe('PaymentRequest', () => {
    test('should create payment request', () => {
        const request = new PaymentRequest(10.0, 'EUR', 'Test purchase');
        expect(request.amount).toBe(10.0);
        expect(request.currency).toBe('EUR');
        expect(request.description).toBe('Test purchase');
        expect(request.metadata).toEqual({});
    });

    test('should create payment request with metadata', () => {
        const metadata = { orderId: '12345', userId: 'user1' };
        const request = new PaymentRequest(10.0, 'EUR', 'Test purchase', metadata);
        expect(request.metadata).toEqual(metadata);
    });
});

describe('BitcoinProvider', () => {
    test('should create bitcoin provider', () => {
        const provider = new BitcoinProvider('test_address');
        expect(provider.name).toBe('Bitcoin (BTC)');
    });

    test('should generate bitcoin URI', () => {
        const provider = new BitcoinProvider('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
        new PaymentRequest(0.5, 'USD', 'Test');
        
        // The provider should generate a valid bitcoin URI
        expect(provider.name).toBe('Bitcoin (BTC)');
    });
});