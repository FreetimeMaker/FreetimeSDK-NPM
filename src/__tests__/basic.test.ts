import { FreetimePaymentSDK, CoinType } from '../index';

describe('FreetimePaymentSDK', () => {
  let sdk: FreetimePaymentSDK;

  beforeEach(() => {
    sdk = new FreetimePaymentSDK();
  });

  test('should create a Bitcoin wallet', () => {
    const wallet = sdk.createWallet(CoinType.BITCOIN, 'Test Bitcoin Wallet');
    
    expect(wallet).toBeDefined();
    expect(wallet.coinType).toBe(CoinType.BITCOIN);
    expect(wallet.name).toBe('Test Bitcoin Wallet');
    expect(wallet.address).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.privateKey).toBeTruthy();
  });

  test('should create an Ethereum wallet', () => {
    const wallet = sdk.createWallet(CoinType.ETHEREUM);
    
    expect(wallet).toBeDefined();
    expect(wallet.coinType).toBe(CoinType.ETHEREUM);
    expect(wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
  });

  test('should validate Bitcoin addresses', () => {
    const validBtc = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    const invalidBtc = 'invalid-address';
    
    expect(sdk.validateAddress(validBtc, CoinType.BITCOIN)).toBe(true);
    expect(sdk.validateAddress(invalidBtc, CoinType.BITCOIN)).toBe(false);
  });

  test('should validate Ethereum addresses', () => {
    const validEth = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45';
    const invalidEth = '0xinvalid';
    
    expect(sdk.validateAddress(validEth, CoinType.ETHEREUM)).toBe(true);
    expect(sdk.validateAddress(invalidEth, CoinType.ETHEREUM)).toBe(false);
  });

  test('should return balance for a wallet address', async () => {
    const wallet = sdk.createWallet(CoinType.BITCOIN);
    const balance = await sdk.getBalance(wallet.address);
    
    expect(balance).toBeTruthy();
    expect(parseFloat(balance)).toBeGreaterThanOrEqual(0);
  });

  test('should return correct fee percentages', () => {
    const feeManager = sdk.getFeeManager();
    
    expect(feeManager.getDeveloperFeePercentage('0.001')).toBe('0.5');
    expect(feeManager.getDeveloperFeePercentage('0.1')).toBe('0.4');
    expect(feeManager.getDeveloperFeePercentage('1')).toBe('0.35');
    expect(feeManager.getDeveloperFeePercentage('10')).toBe('0.25');
    expect(feeManager.getDeveloperFeePercentage('100')).toBe('0.1');
    expect(feeManager.getDeveloperFeePercentage('1000')).toBe('0.05');
  });

  test('should return correct fee tiers', () => {
    const feeManager = sdk.getFeeManager();
    
    expect(feeManager.getFeeTier('0.001')).toBe('Micro (< 0.1)');
    expect(feeManager.getFeeTier('1')).toBe('Standard (>= 1)');
    expect(feeManager.getFeeTier('1000')).toBe('Enterprise (>= 1000)');
  });

  test('should create transaction with fee breakdown', async () => {
    const fromWallet = sdk.createWallet(CoinType.BITCOIN);
    const toAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    const amount = '0.1';
    
    const result = await sdk.send(
      fromWallet.address,
      toAddress,
      amount,
      CoinType.BITCOIN
    );
    
    expect(result).toBeDefined();
    expect(result.transaction).toBeDefined();
    expect(result.feeBreakdown).toBeDefined();
    expect(result.feeBreakdown.originalAmount).toBe(amount);
    expect(parseFloat(result.feeBreakdown.recipientReceives)).toBeLessThan(parseFloat(amount));
  });

  test('should return all created wallets', () => {
    const wallet1 = sdk.createWallet(CoinType.BITCOIN);
    const wallet2 = sdk.createWallet(CoinType.ETHEREUM);
    
    const allWallets = sdk.getAllWallets();
    expect(allWallets).toHaveLength(2);
    expect(allWallets).toContainEqual(wallet1);
    expect(allWallets).toContainEqual(wallet2);
  });

  test('should return wallets by coin type', () => {
    const btcWallet1 = sdk.createWallet(CoinType.BITCOIN);
    const btcWallet2 = sdk.createWallet(CoinType.BITCOIN);
    const ethWallet = sdk.createWallet(CoinType.ETHEREUM);
    
    const btcWallets = sdk.getWalletsByCoinType(CoinType.BITCOIN);
    const ethWallets = sdk.getWalletsByCoinType(CoinType.ETHEREUM);
    
    expect(btcWallets).toHaveLength(2);
    expect(ethWallets).toHaveLength(1);
    expect(btcWallets).toContainEqual(btcWallet1);
    expect(btcWallets).toContainEqual(btcWallet2);
    expect(ethWallets).toContainEqual(ethWallet);
  });
});
