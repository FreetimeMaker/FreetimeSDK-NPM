"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COIN_TYPE_MAP = exports.PaymentStatus = exports.COIN_SYMBOLS = exports.CoinType = void 0;
exports.getCoinSymbol = getCoinSymbol;
var CoinType;
(function (CoinType) {
    CoinType["BITCOIN"] = "BTC";
    CoinType["ETHEREUM"] = "ETH";
    CoinType["LITECOIN"] = "LTC";
    CoinType["BITCOIN_CASH"] = "BCH";
    CoinType["DOGECOIN"] = "DOGE";
    CoinType["SOLANA"] = "SOL";
    CoinType["POLYGON"] = "MATIC";
    CoinType["BINANCE_COIN"] = "BNB";
    CoinType["TRON"] = "TRX";
})(CoinType || (exports.CoinType = CoinType = {}));
// Add symbol mapping for CoinType
exports.COIN_SYMBOLS = {
    [CoinType.BITCOIN]: 'BTC',
    [CoinType.ETHEREUM]: 'ETH',
    [CoinType.LITECOIN]: 'LTC',
    [CoinType.BITCOIN_CASH]: 'BCH',
    [CoinType.DOGECOIN]: 'DOGE',
    [CoinType.SOLANA]: 'SOL',
    [CoinType.POLYGON]: 'MATIC',
    [CoinType.BINANCE_COIN]: 'BNB',
    [CoinType.TRON]: 'TRX'
};
// Extension to get symbol from CoinType
function getCoinSymbol(coinType) {
    return exports.COIN_SYMBOLS[coinType];
}
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["CONFIRMED"] = "confirmed";
    PaymentStatus["EXPIRED"] = "expired";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["NOT_FOUND"] = "not_found";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
exports.COIN_TYPE_MAP = {
    'BTC': CoinType.BITCOIN,
    'ETH': CoinType.ETHEREUM,
    'LTC': CoinType.LITECOIN,
    'BCH': CoinType.BITCOIN_CASH,
    'DOGE': CoinType.DOGECOIN,
    'SOL': CoinType.SOLANA,
    'MATIC': CoinType.POLYGON,
    'BNB': CoinType.BINANCE_COIN,
    'TRX': CoinType.TRON
};
//# sourceMappingURL=types.js.map