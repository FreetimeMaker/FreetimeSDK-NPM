/**
 * Configuration for the SDK.
 */
export class DeveloperConfig {
    constructor(
        public readonly developerId: string,
        public readonly enablePromotions: boolean = true,
        public readonly customPromotionUrl: string | null = null,
        public readonly hideDefaultPromotions: boolean = false
    ) {}
}