import { CoinType } from './types';
import BN from 'bn.js';

export interface UserWalletConfig {
    userId: string;
    walletAddresses: Map<CoinType, string>;
    preferredCoins: CoinType[];
    isDefault: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface WalletSelection {
    coinType: CoinType;
    address: string;
    isActive: boolean;
}

export class UserWalletManager {
    private userWallets: Map<string, UserWalletConfig> = new Map();

    createUserWalletConfig(
        userId: string,
        walletAddresses: Map<CoinType, string>,
        preferredCoins: CoinType[] = []
    ): UserWalletConfig {
        const config: UserWalletConfig = {
            userId,
            walletAddresses: new Map(walletAddresses),
            preferredCoins: preferredCoins.length > 0 ? preferredCoins : Array.from(walletAddresses.keys()),
            isDefault: false,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        this.userWallets.set(userId, config);
        return config;
    }

    getUserWalletConfig(userId: string): UserWalletConfig | null {
        return this.userWallets.get(userId) || null;
    }

    updateUserWalletAddress(userId: string, coinType: CoinType, address: string): boolean {
        const config = this.userWallets.get(userId);
        if (!config) {
            return false;
        }

        config.walletAddresses.set(coinType, address);
        config.updatedAt = Date.now();
        return true;
    }

    removeUserWalletAddress(userId: string, coinType: CoinType): boolean {
        const config = this.userWallets.get(userId);
        if (!config) {
            return false;
        }

        const removed = config.walletAddresses.delete(coinType);
        if (removed) {
            config.updatedAt = Date.now();
            // Remove from preferred coins if it was there
            config.preferredCoins = config.preferredCoins.filter(coin => coin !== coinType);
        }
        return removed;
    }

    setPreferredCoins(userId: string, preferredCoins: CoinType[]): boolean {
        const config = this.userWallets.get(userId);
        if (!config) {
            return false;
        }

        // Only include coins that the user actually has wallet addresses for
        config.preferredCoins = preferredCoins.filter(coin => 
            config.walletAddresses.has(coin)
        );
        config.updatedAt = Date.now();
        return true;
    }

    addPreferredCoin(userId: string, coinType: CoinType): boolean {
        const config = this.userWallets.get(userId);
        if (!config || !config.walletAddresses.has(coinType)) {
            return false;
        }

        if (!config.preferredCoins.includes(coinType)) {
            config.preferredCoins.push(coinType);
            config.updatedAt = Date.now();
        }
        return true;
    }

    removePreferredCoin(userId: string, coinType: CoinType): boolean {
        const config = this.userWallets.get(userId);
        if (!config) {
            return false;
        }

        const index = config.preferredCoins.indexOf(coinType);
        if (index > -1) {
            config.preferredCoins.splice(index, 1);
            config.updatedAt = Date.now();
            return true;
        }
        return false;
    }

    getWalletAddress(userId: string, coinType: CoinType): string | null {
        const config = this.userWallets.get(userId);
        return config ? (config.walletAddresses.get(coinType) || null) : null;
    }

    getAvailableCoins(userId: string): CoinType[] {
        const config = this.userWallets.get(userId);
        return config ? Array.from(config.walletAddresses.keys()) : [];
    }

    getPreferredCoins(userId: string): CoinType[] {
        const config = this.userWallets.get(userId);
        return config ? [...config.preferredCoins] : [];
    }

    getWalletSelections(userId: string): WalletSelection[] {
        const config = this.userWallets.get(userId);
        if (!config) {
            return [];
        }

        return Array.from(config.walletAddresses.entries()).map(([coinType, address]) => ({
            coinType,
            address,
            isActive: config.preferredCoins.includes(coinType)
        }));
    }

    setAsDefault(userId: string): boolean {
        const config = this.userWallets.get(userId);
        if (!config) {
            return false;
        }

        // Set all other configs as non-default
        this.userWallets.forEach((otherConfig) => {
            otherConfig.isDefault = false;
        });

        config.isDefault = true;
        config.updatedAt = Date.now();
        return true;
    }

    isDefaultConfig(userId: string): boolean {
        const config = this.userWallets.get(userId);
        return config ? config.isDefault : false;
    }

    deleteUserWalletConfig(userId: string): boolean {
        return this.userWallets.delete(userId);
    }

    getAllUserConfigs(): UserWalletConfig[] {
        return Array.from(this.userWallets.values());
    }

    getDefaultConfig(): UserWalletConfig | null {
        return Array.from(this.userWallets.values()).find(config => config.isDefault) || null;
    }

    validateWalletAddress(userId: string, coinType: CoinType, address: string): boolean {
        // Basic validation - in a real implementation, you'd validate according to each cryptocurrency's address format
        if (!address || address.length < 10) {
            return false;
        }

        const config = this.userWallets.get(userId);
        if (!config) {
            return false;
        }

        // Check if address already exists for this coin type
        const existingAddress = config.walletAddresses.get(coinType);
        if (existingAddress && existingAddress === address) {
            return true; // Same address, that's fine
        }

        // Additional validation could be added here based on coin type
        return true;
    }

    exportUserConfig(userId: string): object | null {
        const config = this.userWallets.get(userId);
        if (!config) {
            return null;
        }

        return {
            userId: config.userId,
            walletAddresses: Object.fromEntries(config.walletAddresses),
            preferredCoins: config.preferredCoins,
            isDefault: config.isDefault,
            createdAt: config.createdAt,
            updatedAt: config.updatedAt
        };
    }

    importUserConfig(configData: any): boolean {
        try {
            if (!configData || !configData.userId || !configData.walletAddresses) {
                return false;
            }

            const walletAddresses = new Map(Object.entries(configData.walletAddresses) as [CoinType, string][]);
            const config: UserWalletConfig = {
                userId: configData.userId,
                walletAddresses,
                preferredCoins: configData.preferredCoins || [],
                isDefault: configData.isDefault || false,
                createdAt: configData.createdAt || Date.now(),
                updatedAt: Date.now()
            };

            this.userWallets.set(config.userId, config);
            return true;
        } catch (error) {
            return false;
        }
    }
}
