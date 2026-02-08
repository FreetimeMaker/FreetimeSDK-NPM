const { FreetimePaymentSDK, CoinType } = require('../dist/index');

async function advancedUsageExample() {
  console.log('🔧 Freetime Payment SDK - Advanced Usage Example');
  console.log('===============================================\n');

  const sdk = new FreetimePaymentSDK();

  // Create multiple wallets for different coins
  console.log('📝 Creating multi-currency wallet portfolio...');
  const wallets = [
    sdk.createWallet(CoinType.BITCOIN, 'Bitcoin Savings'),
    sdk.createWallet(CoinType.ETHEREUM, 'Ethereum Trading'),
    sdk.createWallet(CoinType.LITECOIN, 'Litecoin Transactions'),
    sdk.createWallet(CoinType.DOGECOIN, 'Dogecoin Tips'),
    sdk.createWallet(CoinType.SOLANA, 'Solana Staking'),
  ];

  wallets.forEach(wallet => {
    console.log(`${wallet.coinType}: ${wallet.address} (${wallet.name})`);
  });
  console.log();

  // Validate addresses
  console.log('🔍 Validating addresses...');
  const testAddresses = [
    { address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', coin: CoinType.BITCOIN },
    { address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45', coin: CoinType.ETHEREUM },
    { address: 'invalid-address', coin: CoinType.BITCOIN },
  ];

  testAddresses.forEach(({ address, coin }) => {
    const isValid = sdk.validateAddress(address, coin);
    console.log(`${address} (${coin}): ${isValid ? '✅ Valid' : '❌ Invalid'}`);
  });
  console.log();

  // Fee tier analysis
  console.log('📊 Fee Tier Analysis:');
  const testAmounts = ['0.001', '0.01', '0.1', '1', '10', '100', '1000'];
  const feeManager = sdk.getFeeManager();

  testAmounts.forEach(amount => {
    const percentage = feeManager.getDeveloperFeePercentage(amount);
    const tier = feeManager.getFeeTier(amount);
    console.log(`${amount} → ${percentage}% (${tier})`);
  });
  console.log();

  // Custom fee manager configuration
  console.log('⚙️ Custom Fee Manager Configuration:');
  const customFeeManager = sdk.getFeeManager();
  
  // Update developer wallet for Bitcoin
  customFeeManager.updateDeveloperWallet(
    CoinType.BITCOIN, 
    'bc1qcustom-developer-wallet-address'
  );
  
  console.log('Updated Bitcoin developer wallet to custom address');
  console.log(`New Bitcoin dev wallet: ${customFeeManager.getDeveloperWalletAddress(CoinType.BITCOIN)}`);
  console.log();

  // Transaction simulation with different amounts
  console.log('🔄 Transaction Simulation:');
  const recipientAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  const amounts = ['0.01', '0.1', '1.0'];

  for (const amount of amounts) {
    try {
      console.log(`\n--- Sending ${amount} BTC ---`);
      
      const result = await sdk.send(
        wallets[0].address, // Bitcoin wallet
        recipientAddress,
        amount,
        CoinType.BITCOIN
      );

      console.log('Fee breakdown:');
      console.log(result.feeBreakdown.getFormattedBreakdown());

      // Simulate broadcasting without actually sending
      console.log('📋 Transaction prepared (not broadcasted in demo)');
      
    } catch (error) {
      console.error(`❌ Error with ${amount} BTC:`, error.message);
    }
  }

  // Wallet management
  console.log('\n📂 Wallet Management:');
  const allWallets = sdk.getAllWallets();
  console.log(`Total wallets created: ${allWallets.length}`);

  const btcWallets = sdk.getWalletsByCoinType(CoinType.BITCOIN);
  console.log(`Bitcoin wallets: ${btcWallets.length}`);

  const ethWallets = sdk.getWalletsByCoinType(CoinType.ETHEREUM);
  console.log(`Ethereum wallets: ${ethWallets.length}`);

  // Security demonstration (showing only first 8 characters of private keys)
  console.log('\n🔐 Security Information:');
  wallets.forEach(wallet => {
    const maskedPrivateKey = wallet.privateKey.substring(0, 8) + '...';
    console.log(`${wallet.coinType} - Private Key: ${maskedPrivateKey}`);
  });

  console.log('\n🎉 Advanced example completed!');
}

// Run the example
if (require.main === module) {
  advancedUsageExample().catch(console.error);
}

module.exports = { advancedUsageExample };
