import { CoinType, Transaction, TransactionWithFees, FeeBreakdown, PaymentStatus } from './types';
import { FeeBreakdownImpl } from './FeeBreakdown';
import { TransactionQueue } from './TransactionQueue';

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
    public feeBreakdown: FeeBreakdown,
    private queue?: TransactionQueue
  ) {}

  async broadcast(): Promise<string> {
    if (this.queue) {
      this.queue.enqueue(this.transaction);
      return this.transaction.hash;
    }

    // Legacy fallback
    this.transaction.status = 'pending';
    console.log(`Broadcasting transaction: ${this.transaction.hash}`);
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
