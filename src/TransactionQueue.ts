import { Transaction, PaymentStatus } from './types';

/**
 * Transaction Queue for Offline-First payment support.
 * Ported from Android FreetimeSDK v1.1.0
 */
export class TransactionQueue {
    private queue: Map<string, QueuedTransaction> = new Map();
    private isProcessing: boolean = false;
    private isOnline: boolean = true;
    private retryLimit: number = 3;

    constructor() {
        // In a real Node.js app, this could load from disk/database
        this.checkConnectivity();
    }

    /**
     * Add a transaction to the queue for broadcasting
     */
    enqueue(transaction: Transaction): void {
        const queuedTx: QueuedTransaction = {
            transaction,
            retries: 0,
            status: PaymentStatus.QUEUED,
            addedAt: Date.now()
        };

        this.queue.set(transaction.hash, queuedTx);
        console.log(`Transaction ${transaction.hash} queued (Offline-First)`);

        if (this.isOnline) {
            this.processQueue();
        }
    }

    /**
     * Set the connectivity status
     */
    setOnlineStatus(online: boolean): void {
        this.isOnline = online;
        if (online) {
            console.log("SDK is back online. Resuming transaction queue...");
            this.processQueue();
        } else {
            console.log("SDK is offline. Transactions will be queued.");
        }
    }

    /**
     * Process all queued transactions
     */
    private async processQueue(): Promise<void> {
        if (this.isProcessing || !this.isOnline || this.queue.size === 0) return;

        this.isProcessing = true;

        const txsToProcess = Array.from(this.queue.values())
            .filter(q => q.status === PaymentStatus.QUEUED);

        for (const queuedTx of txsToProcess) {
            try {
                await this.broadcastTransaction(queuedTx);
            } catch (error) {
                console.error(`Failed to broadcast ${queuedTx.transaction.hash}:`, error);
                queuedTx.retries++;

                if (queuedTx.retries >= this.retryLimit) {
                    queuedTx.status = PaymentStatus.FAILED;
                    console.error(`Transaction ${queuedTx.transaction.hash} reached retry limit.`);
                }
            }
        }

        this.isProcessing = false;

        // Check if there are still pending items
        if (this.queue.size > 0 && this.isOnline) {
            setTimeout(() => this.processQueue(), 5000);
        }
    }

    private async broadcastTransaction(queuedTx: QueuedTransaction): Promise<void> {
        // Simulate network broadcast
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.isOnline) {
                    reject(new Error("Network disconnected during broadcast"));
                    return;
                }

                queuedTx.status = PaymentStatus.CONFIRMED;
                queuedTx.transaction.status = 'confirmed';
                this.queue.delete(queuedTx.transaction.hash);

                console.log(`Transaction ${queuedTx.transaction.hash} successfully broadcasted.`);
                resolve();
            }, 1000);
        });
    }

    /**
     * Get status of a queued transaction
     */
    getTransactionStatus(hash: string): PaymentStatus {
        const queued = this.queue.get(hash);
        if (queued) return queued.status;
        return PaymentStatus.NOT_FOUND;
    }

    /**
     * Get all queued transactions
     */
    getQueuedTransactions(): Transaction[] {
        return Array.from(this.queue.values()).map(q => q.transaction);
    }

    private checkConnectivity(): void {
        // Simulation of connectivity check
        this.isOnline = true;
    }
}

export interface QueuedTransaction {
    transaction: Transaction;
    retries: number;
    status: PaymentStatus;
    addedAt: number;
}
