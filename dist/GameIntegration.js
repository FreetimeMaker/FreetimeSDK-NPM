"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameIntegration = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
class GameIntegration {
    constructor() {
        this.playerStats = new Map();
        this.leaderboards = new Map();
        this.gameSessions = new Map();
        this.achievements = new Map();
        this.initializeDefaultAchievements();
    }
    initializeDefaultAchievements() {
        const defaultAchievements = [
            {
                id: 'first_win',
                name: 'First Victory',
                description: 'Win your first game',
                xpReward: 100,
                isUnlocked: false
            },
            {
                id: 'streak_5',
                name: 'On Fire',
                description: 'Win 5 games in a row',
                xpReward: 500,
                isUnlocked: false
            },
            {
                id: 'level_10',
                name: 'Experienced Player',
                description: 'Reach level 10',
                xpReward: 1000,
                isUnlocked: false
            },
            {
                id: 'crypto_master',
                name: 'Cryptocurrency Master',
                description: 'Win 1000 total coins across all games',
                xpReward: 2000,
                isUnlocked: false
            }
        ];
        defaultAchievements.forEach(achievement => {
            this.achievements.set(achievement.id, achievement);
        });
    }
    createPlayer(playerId, playerName) {
        const stats = {
            playerId,
            totalXP: 0,
            level: 1,
            achievements: [],
            totalGamesPlayed: 0,
            totalWinnings: new Map(),
            currentStreak: 0,
            bestStreak: 0,
            lastPlayedAt: Date.now()
        };
        this.playerStats.set(playerId, stats);
        return stats;
    }
    getPlayerStats(playerId) {
        return this.playerStats.get(playerId) || null;
    }
    startGameSession(playerId, gameType) {
        const session = {
            id: this.generateSessionId(),
            playerId,
            gameType,
            startedAt: Date.now(),
            score: 0,
            xpEarned: 0,
            achievementsUnlocked: []
        };
        this.gameSessions.set(session.id, session);
        return session;
    }
    endGameSession(sessionId, score, won, coinsWon) {
        const session = this.gameSessions.get(sessionId);
        if (!session) {
            throw new Error('Game session not found');
        }
        session.endedAt = Date.now();
        session.score = score;
        session.coinsWon = coinsWon || new Map();
        // Calculate XP based on score and performance
        session.xpEarned = this.calculateXP(score, won);
        // Update player stats
        this.updatePlayerStats(session);
        return session;
    }
    calculateXP(score, won) {
        let baseXP = Math.floor(score / 10);
        if (won) {
            baseXP += 50; // Bonus for winning
        }
        return Math.max(baseXP, 10); // Minimum 10 XP
    }
    updatePlayerStats(session) {
        const playerStats = this.playerStats.get(session.playerId);
        if (!playerStats)
            return;
        playerStats.totalXP += session.xpEarned;
        playerStats.totalGamesPlayed++;
        playerStats.lastPlayedAt = session.endedAt || Date.now();
        // Update level based on XP
        playerStats.level = this.calculateLevel(playerStats.totalXP);
        // Update winnings
        if (session.coinsWon) {
            session.coinsWon.forEach((amount, coinType) => {
                const current = playerStats.totalWinnings.get(coinType) || new bn_js_1.default(0);
                playerStats.totalWinnings.set(coinType, current.add(amount));
            });
        }
        // Update streak (simplified - assumes win if score > 0)
        if (session.score > 0) {
            playerStats.currentStreak++;
            playerStats.bestStreak = Math.max(playerStats.bestStreak, playerStats.currentStreak);
        }
        else {
            playerStats.currentStreak = 0;
        }
        // Check for achievements
        this.checkAchievements(playerStats, session);
    }
    calculateLevel(totalXP) {
        // Simple level calculation: 100 XP per level for first 10 levels, then 200 XP per level
        if (totalXP < 1000) {
            return Math.floor(totalXP / 100) + 1;
        }
        return Math.floor((totalXP - 1000) / 200) + 11;
    }
    checkAchievements(playerStats, session) {
        const unlockedAchievements = [];
        // First win achievement
        if (session.score > 0 && !this.isAchievementUnlocked(playerStats, 'first_win')) {
            this.unlockAchievement(playerStats, 'first_win');
            unlockedAchievements.push('first_win');
        }
        // Streak achievement
        if (playerStats.currentStreak >= 5 && !this.isAchievementUnlocked(playerStats, 'streak_5')) {
            this.unlockAchievement(playerStats, 'streak_5');
            unlockedAchievements.push('streak_5');
        }
        // Level achievement
        if (playerStats.level >= 10 && !this.isAchievementUnlocked(playerStats, 'level_10')) {
            this.unlockAchievement(playerStats, 'level_10');
            unlockedAchievements.push('level_10');
        }
        // Crypto master achievement
        const totalCoins = this.getTotalCoinsWon(playerStats);
        if (totalCoins.gte(new bn_js_1.default(1000)) && !this.isAchievementUnlocked(playerStats, 'crypto_master')) {
            this.unlockAchievement(playerStats, 'crypto_master');
            unlockedAchievements.push('crypto_master');
        }
        session.achievementsUnlocked = unlockedAchievements;
    }
    getTotalCoinsWon(playerStats) {
        let total = new bn_js_1.default(0);
        playerStats.totalWinnings.forEach(amount => {
            total = total.add(amount);
        });
        return total;
    }
    isAchievementUnlocked(playerStats, achievementId) {
        return playerStats.achievements.some(a => a.id === achievementId);
    }
    unlockAchievement(playerStats, achievementId) {
        const achievement = this.achievements.get(achievementId);
        if (!achievement || this.isAchievementUnlocked(playerStats, achievementId)) {
            return;
        }
        const unlockedAchievement = {
            ...achievement,
            isUnlocked: true,
            unlockedAt: Date.now()
        };
        playerStats.achievements.push(unlockedAchievement);
        playerStats.totalXP += achievement.xpReward;
        // Recalculate level after XP bonus
        playerStats.level = this.calculateLevel(playerStats.totalXP);
    }
    getLeaderboard(gameType) {
        const allPlayers = Array.from(this.playerStats.values());
        // Sort by total XP (or could be game-specific score)
        allPlayers.sort((a, b) => b.totalXP - a.totalXP);
        return allPlayers.map((player, index) => ({
            playerId: player.playerId,
            score: player.totalXP,
            level: player.level,
            rank: index + 1
        }));
    }
    getGameSession(sessionId) {
        return this.gameSessions.get(sessionId) || null;
    }
    getPlayerSessions(playerId) {
        return Array.from(this.gameSessions.values()).filter(session => session.playerId === playerId);
    }
    getAllAchievements() {
        return Array.from(this.achievements.values());
    }
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}
exports.GameIntegration = GameIntegration;
//# sourceMappingURL=GameIntegration.js.map