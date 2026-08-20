import { CoinType } from './types';
import BN from 'bn.js';
/**
 * Statistics Manager for Freetime SDK - Tracks player engagement and predictive analytics.
 * Ported from Android StatisticsManager v1.1.0
 */
export declare class StatisticsManager {
    private playerStats;
    /**
     * Track a new session for a player
     */
    trackSession(playerId: string, durationMinutes: number): void;
    /**
     * Track a purchase or spend event
     */
    trackSpend(playerId: string, amount: BN, coinType: CoinType): void;
    /**
     * Get engagement metrics for a player
     */
    getEngagementMetrics(playerId: string): EngagementMetrics | null;
    /**
     * Predict churn probability (0.0 to 1.0)
     */
    getChurnProbability(playerId: string): number;
    /**
     * Get spend percentile for a player relative to others
     */
    getSpendPercentile(playerId: string): number;
    private calculateTotalUsdSpend;
    private calculateLoyaltyScore;
    private getOrCreateStats;
}
export interface DetailedPlayerStats {
    playerId: string;
    totalSessions: number;
    totalPlayTimeMinutes: number;
    avgSessionLength: number;
    lastSessionAt: number;
    sessionHistory: Array<{
        timestamp: number;
        duration: number;
    }>;
    totalSpend: Map<CoinType, BN>;
    lastSpendAt: number;
}
export interface EngagementMetrics {
    totalSessions: number;
    avgSessionLength: number;
    daysSinceLastPlayed: number;
    loyaltyScore: number;
}
//# sourceMappingURL=StatisticsManager.d.ts.map