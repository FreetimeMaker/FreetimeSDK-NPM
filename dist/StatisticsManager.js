"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsManager = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * Statistics Manager for Freetime SDK - Tracks player engagement and predictive analytics.
 * Ported from Android StatisticsManager v1.1.0
 */
class StatisticsManager {
    constructor() {
        this.playerStats = new Map();
    }
    /**
     * Track a new session for a player
     */
    trackSession(playerId, durationMinutes) {
        const stats = this.getOrCreateStats(playerId);
        stats.totalSessions++;
        stats.totalPlayTimeMinutes += durationMinutes;
        stats.lastSessionAt = Date.now();
        stats.sessionHistory.push({
            timestamp: Date.now(),
            duration: durationMinutes
        });
        // Update average session length
        stats.avgSessionLength = stats.totalPlayTimeMinutes / stats.totalSessions;
    }
    /**
     * Track a purchase or spend event
     */
    trackSpend(playerId, amount, coinType) {
        const stats = this.getOrCreateStats(playerId);
        const currentTotal = stats.totalSpend.get(coinType) || new bn_js_1.default(0);
        stats.totalSpend.set(coinType, currentTotal.add(amount));
        stats.lastSpendAt = Date.now();
    }
    /**
     * Get engagement metrics for a player
     */
    getEngagementMetrics(playerId) {
        const stats = this.playerStats.get(playerId);
        if (!stats)
            return null;
        return {
            totalSessions: stats.totalSessions,
            avgSessionLength: stats.avgSessionLength,
            daysSinceLastPlayed: Math.floor((Date.now() - stats.lastSessionAt) / (1000 * 60 * 60 * 24)),
            loyaltyScore: this.calculateLoyaltyScore(stats)
        };
    }
    /**
     * Predict churn probability (0.0 to 1.0)
     */
    getChurnProbability(playerId) {
        const stats = this.playerStats.get(playerId);
        if (!stats)
            return 0;
        const daysInactive = (Date.now() - stats.lastSessionAt) / (1000 * 60 * 60 * 24);
        // Simple churn model: increases significantly after 7 days of inactivity
        if (daysInactive < 1)
            return 0.05;
        if (daysInactive < 3)
            return 0.15;
        if (daysInactive < 7)
            return 0.4;
        if (daysInactive < 14)
            return 0.8;
        return 0.99;
    }
    /**
     * Get spend percentile for a player relative to others
     */
    getSpendPercentile(playerId) {
        const stats = this.playerStats.get(playerId);
        if (!stats)
            return 0;
        const allSpendValues = Array.from(this.playerStats.values()).map(s => this.calculateTotalUsdSpend(s));
        if (allSpendValues.length <= 1)
            return 100;
        allSpendValues.sort((a, b) => a - b);
        const playerSpend = this.calculateTotalUsdSpend(stats);
        const index = allSpendValues.indexOf(playerSpend);
        return (index / (allSpendValues.length - 1)) * 100;
    }
    calculateTotalUsdSpend(stats) {
        // Mock conversion for simplicity
        let total = 0;
        stats.totalSpend.forEach((amount, coinType) => {
            total += amount.toNumber(); // In a real app, convert to USD
        });
        return total;
    }
    calculateLoyaltyScore(stats) {
        // Loyalty based on frequency and duration
        const frequencyFactor = Math.min(stats.totalSessions / 10, 1.0);
        const durationFactor = Math.min(stats.totalPlayTimeMinutes / 600, 1.0);
        return (frequencyFactor * 0.4 + durationFactor * 0.6) * 100;
    }
    getOrCreateStats(playerId) {
        let stats = this.playerStats.get(playerId);
        if (!stats) {
            stats = {
                playerId,
                totalSessions: 0,
                totalPlayTimeMinutes: 0,
                avgSessionLength: 0,
                lastSessionAt: Date.now(),
                sessionHistory: [],
                totalSpend: new Map(),
                lastSpendAt: 0
            };
            this.playerStats.set(playerId, stats);
        }
        return stats;
    }
}
exports.StatisticsManager = StatisticsManager;
//# sourceMappingURL=StatisticsManager.js.map