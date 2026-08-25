"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionManager = exports.PromotionResponse = exports.Promotion = void 0;
const https_1 = __importDefault(require("https"));
const DEFAULT_PROMO_URL = 'https://raw.githubusercontent.com/FreetimeMaker/FreetimeSDK/master/promotions.json';
class Promotion {
    constructor(id, title, description, iconUrl, targetUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.iconUrl = iconUrl;
        this.targetUrl = targetUrl;
    }
}
exports.Promotion = Promotion;
class PromotionResponse {
    constructor(version, promotions) {
        this.version = version;
        this.promotions = promotions;
    }
}
exports.PromotionResponse = PromotionResponse;
class PromotionManager {
    static async fetchPromotion(config) {
        if (!config.enablePromotions) {
            return null;
        }
        const urlToFetch = config.customPromotionUrl || PromotionManager.DEFAULT_PROMO_URL;
        try {
            const promotionData = await PromotionManager.fetchJson(urlToFetch);
            if (promotionData.promotions && Array.isArray(promotionData.promotions) && promotionData.promotions.length > 0) {
                const randomIndex = Math.floor(Math.random() * promotionData.promotions.length);
                const promoJson = promotionData.promotions[randomIndex];
                return new Promotion(promoJson.id, promoJson.title, promoJson.description, promoJson.iconUrl, promoJson.targetUrl);
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching promotion:', error);
            return null;
        }
    }
    static fetchJson(url) {
        return new Promise((resolve, reject) => {
            https_1.default.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }
}
exports.PromotionManager = PromotionManager;
PromotionManager.DEFAULT_PROMO_URL = DEFAULT_PROMO_URL;
//# sourceMappingURL=PromotionManager.js.map