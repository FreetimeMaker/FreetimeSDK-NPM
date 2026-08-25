import { DeveloperConfig } from './DeveloperConfig';
import https from 'https';

const DEFAULT_PROMO_URL = 'https://raw.githubusercontent.com/FreetimeMaker/FreetimeSDK/master/promotions.json';

export class Promotion {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly iconUrl: string,
        public readonly targetUrl: string
    ) {}
}

export class PromotionResponse {
    constructor(
        public readonly version: number,
        public readonly promotions: Promotion[]
    ) {}
}

export class PromotionManager {
    private static readonly DEFAULT_PROMO_URL = DEFAULT_PROMO_URL;

    static async fetchPromotion(config: DeveloperConfig): Promise<Promotion | null> {
        if (!config.enablePromotions) {
            return null;
        }

        const urlToFetch = config.customPromotionUrl || PromotionManager.DEFAULT_PROMO_URL;

        try {
            const promotionData = await PromotionManager.fetchJson(urlToFetch);
            
            if (promotionData.promotions && Array.isArray(promotionData.promotions) && promotionData.promotions.length > 0) {
                const randomIndex = Math.floor(Math.random() * promotionData.promotions.length);
                const promoJson = promotionData.promotions[randomIndex];
                
                return new Promotion(
                    promoJson.id,
                    promoJson.title,
                    promoJson.description,
                    promoJson.iconUrl,
                    promoJson.targetUrl
                );
            }
            
            return null;
        } catch (error) {
            console.error('Error fetching promotion:', error);
            return null;
        }
    }

    private static fetchJson(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }
}