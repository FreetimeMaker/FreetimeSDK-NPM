import { CoinType } from './types';
import BN from 'bn.js';
export interface Achievement {
    id: string;
    name: string;
    description: string;
    xpReward: number;
    coinReward?: BN;
    coinType?: CoinType;
    unlockedAt?: number;
    isUnlocked: boolean;
}
export interface PlayerStats {
    playerId: string;
    totalXP: number;
    level: number;
    achievements: Achievement[];
    totalGamesPlayed: number;
    totalWinnings: Map<CoinType, BN>;
    currentStreak: number;
    bestStreak: number;
    lastPlayedAt: number;
}
export interface LeaderboardEntry {
    playerId: string;
    playerName?: string;
    score: number;
    level: number;
    rank: number;
}
export interface GameSession {
    id: string;
    playerId: string;
    gameType: string;
    startedAt: number;
    endedAt?: number;
    score: number;
    xpEarned: number;
    coinsWon?: Map<CoinType, BN>;
    achievementsUnlocked: string[];
}
export declare class GameIntegration {
    private playerStats;
    private leaderboards;
    private gameSessions;
    private achievements;
    constructor();
    private initializeDefaultAchievements;
    createPlayer(playerId: string, playerName?: string): PlayerStats;
    getPlayerStats(playerId: string): PlayerStats | null;
    startGameSession(playerId: string, gameType: string): GameSession;
    endGameSession(sessionId: string, score: number, won: boolean, coinsWon?: Map<CoinType, BN>): GameSession;
    private calculateXP;
    private updatePlayerStats;
    private calculateLevel;
    private checkAchievements;
    private getTotalCoinsWon;
    private isAchievementUnlocked;
    private unlockAchievement;
    getLeaderboard(gameType?: string): LeaderboardEntry[];
    getGameSession(sessionId: string): GameSession | null;
    getPlayerSessions(playerId: string): GameSession[];
    getAllAchievements(): Achievement[];
    private generateSessionId;
}
//# sourceMappingURL=GameIntegration.d.ts.map