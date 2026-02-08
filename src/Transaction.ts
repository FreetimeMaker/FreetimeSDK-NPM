import { CoinType, Transaction, TransactionWithFees, FeeBreakdown } from './types';
import { FeeBreakdownImpl } from './FeeBreakdown';

export class TransactionImpl implements Transaction {
  constructor(
    public hash: string,
    public fromAddress: string,
    public toAddress: string,
    public amount: string,
    public fee: string,
    public coinType: CoinType,
    public timestamp: number = Date.now(),
    public status: 'pending' | 'confirmed' | 'failed' = 'pending'
  ) {}
}

export class TransactionWithFeesImpl implements TransactionWithFees {
  constructor(
    public transaction: Transaction,
    public feeBreakdown: FeeBreakdown
  ) {}

  async broadcast(): Promise<string> {
    this.transaction.status = 'pending';
    
    console.log(`Broadcasting transaction: ${this.transaction.hash}`);
    console.log(this.feeBreakdown.getFormattedBreakdown());
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.transaction.status = 'confirmed';
    return this.transaction.hash;
  }

  getFormattedSummary(): string {
    return `Transaction Summary:
Hash: ${this.transaction.hash}
From: ${this.transaction.fromAddress}
To: ${this.transaction.toAddress}
Amount: ${this.transaction.amount} ${this.transaction.coinType}
Status: ${this.transaction.status}
${this.feeBreakdown.getFormattedBreakdown()}`;
  }
}
