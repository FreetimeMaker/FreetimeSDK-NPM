const { FreetimePaymentSDK, CoinType } = require('../dist/index');

async function basicUsageExample() {
  console.log('🚀 Freetime Payment SDK - Basic Usage Example');
  console.log('==========================================\n');

  // Initialize SDK
  const sdk = new FreetimePaymentSDK();
  console.log('✅ SDK initialized successfully\n');

  // Create wallets
  console.log('📝 Creating wallets...');
  const bitcoinWallet = sdk.createWallet(CoinType.BITCOIN, 'My Bitcoin Wallet');
  const ethereumWallet = sdk.createWallet(CoinType.ETHEREUM, 'My Ethereum Wallet');
  
  console.log(`Bitcoin Wallet: ${bitcoinWallet.address}`);
  console.log(`Ethereum Wallet: ${ethereumWallet.address}\n`);

  // Check balances
  console.log('💰 Checking balances...');
  const btcBalance = await sdk.getBalance(bitcoinWallet.address);
  const ethBalance = await sdk.getBalance(ethereumWallet.address);
  
  console.log(`BTC Balance: ${btcBalance} BTC`);
  console.log(`ETH Balance: ${ethBalance} ETH\n`);

  // Fee estimation
  console.log('📊 Estimating fees...');
  const recipientAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  const amount = '0.001';
  
  const fee = await sdk.getFeeEstimate(
    bitcoinWallet.address,
    recipientAddress,
    amount,
    CoinType.BITCOIN
  );
  
  console.log(`Estimated fee for ${amount} BTC: ${fee} BTC\n`);

  // Send cryptocurrency with fees
  console.log('📤 Sending cryptocurrency...');
  try {
    const result = await sdk.send(
      bitcoinWallet.address,
      recipientAddress,
      '0.1',
      CoinType.BITCOIN
    );

    console.log('Fee Breakdown:');
    console.log(result.feeBreakdown.getFormattedBreakdown());
    console.log();

    // Broadcast transaction
    const txHash = await result.broadcast();
    console.log(`✅ Transaction broadcasted successfully!`);
    console.log(`📋 Transaction Hash: ${txHash}\n`);

  } catch (error) {
    console.error('❌ Error sending transaction:', error.message);
  }

  // Fee manager information
  console.log('💳 Fee Manager Information:');
  const feeManager = sdk.getFeeManager();
  
  console.log(`Fee percentage for 1.5 BTC: ${feeManager.getDeveloperFeePercentage('1.5')}%`);
  console.log(`Fee tier for 1.5 BTC: ${feeManager.getFeeTier('1.5')}`);
  
  const allWallets = feeManager.getAllDeveloperWallets();
  console.log('Developer wallets:');
  for (const [coinType, address] of allWallets) {
    console.log(`  ${coinType}: ${address}`);
  }

  console.log('\n🎉 Example completed successfully!');
}

// Run the example
if (require.main === module) {
  basicUsageExample().catch(console.error);
}

module.exports = { basicUsageExample };
