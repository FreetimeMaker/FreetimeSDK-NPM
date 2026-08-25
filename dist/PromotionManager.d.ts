import { DeveloperConfig } from './DeveloperConfig';
export declare class Promotion {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly iconUrl: string;
    readonly targetUrl: string;
    constructor(id: string, title: string, description: string, iconUrl: string, targetUrl: string);
}
export declare class PromotionResponse {
    readonly version: number;
    readonly promotions: Promotion[];
    constructor(version: number, promotions: Promotion[]);
}
export declare class PromotionManager {
    private static readonly DEFAULT_PROMO_URL;
    static fetchPromotion(config: DeveloperConfig): Promise<Promotion | null>;
    private static fetchJson;
}
//# sourceMappingURL=PromotionManager.d.ts.map