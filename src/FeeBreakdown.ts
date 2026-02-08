import { CoinType, FeeBreakdown } from './types';

export class FeeBreakdownImpl implements FeeBreakdown {
  constructor(
    public originalAmount: string,
    public networkFee: string,
    public developerFee: string,
    public developerFeePercentage: string,
    public totalFee: string,
    public recipientReceives: string,
    public developerWallet: string,
    public coinType: CoinType
  ) {}

  getFormattedBreakdown(): string {
    return `Transaction Fee Breakdown (${this.coinType}):
Original Amount: ${this.originalAmount} ${this.coinType}
Network Fee: ${this.networkFee} ${this.coinType}
Developer Fee (${this.developerFeePercentage}%): ${this.developerFee} ${this.coinType}
Total Fee: ${this.totalFee} ${this.coinType}
Recipient Receives: ${this.recipientReceives} ${this.coinType}
Developer Wallet: ${this.developerWallet}`;
  }
}
