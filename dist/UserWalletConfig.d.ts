import { CoinType } from './types';
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
export declare class UserWalletManager {
    private userWallets;
    createUserWalletConfig(userId: string, walletAddresses: Map<CoinType, string>, preferredCoins?: CoinType[]): UserWalletConfig;
    getUserWalletConfig(userId: string): UserWalletConfig | null;
    updateUserWalletAddress(userId: string, coinType: CoinType, address: string): boolean;
    removeUserWalletAddress(userId: string, coinType: CoinType): boolean;
    setPreferredCoins(userId: string, preferredCoins: CoinType[]): boolean;
    addPreferredCoin(userId: string, coinType: CoinType): boolean;
    removePreferredCoin(userId: string, coinType: CoinType): boolean;
    getWalletAddress(userId: string, coinType: CoinType): string | null;
    getAvailableCoins(userId: string): CoinType[];
    getPreferredCoins(userId: string): CoinType[];
    getWalletSelections(userId: string): WalletSelection[];
    setAsDefault(userId: string): boolean;
    isDefaultConfig(userId: string): boolean;
    deleteUserWalletConfig(userId: string): boolean;
    getAllUserConfigs(): UserWalletConfig[];
    getDefaultConfig(): UserWalletConfig | null;
    validateWalletAddress(userId: string, coinType: CoinType, address: string): boolean;
    exportUserConfig(userId: string): object | null;
    importUserConfig(configData: any): boolean;
}
//# sourceMappingURL=UserWalletConfig.d.ts.map