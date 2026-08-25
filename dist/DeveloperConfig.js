"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperConfig = void 0;
/**
 * Configuration for the SDK.
 */
class DeveloperConfig {
    constructor(developerId, enablePromotions = true, customPromotionUrl = null, hideDefaultPromotions = false) {
        this.developerId = developerId;
        this.enablePromotions = enablePromotions;
        this.customPromotionUrl = customPromotionUrl;
        this.hideDefaultPromotions = hideDefaultPromotions;
    }
}
exports.DeveloperConfig = DeveloperConfig;
//# sourceMappingURL=DeveloperConfig.js.map