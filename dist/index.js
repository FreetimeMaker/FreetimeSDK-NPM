"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWalletManager = exports.GameIntegration = exports.CurrencyConverter = exports.UsdPaymentDetails = exports.ConfirmedUsdPayment = exports.UsdPaymentRequest = exports.UsdPaymentGateway = exports.UsdPaymentRequestWithWalletSelection = exports.ExternalWalletManager = exports.ExternalWalletApp = exports.CryptoUtils = exports.FeeBreakdownImpl = exports.FeeManagerImpl = exports.TransactionWithFeesImpl = exports.TransactionImpl = exports.WalletImpl = exports.FreetimePaymentSDK = void 0;
var FreetimePaymentSDK_1 = require("./FreetimePaymentSDK");
Object.defineProperty(exports, "FreetimePaymentSDK", { enumerable: true, get: function () { return FreetimePaymentSDK_1.FreetimePaymentSDK; } });
var Wallet_1 = require("./Wallet");
Object.defineProperty(exports, "WalletImpl", { enumerable: true, get: function () { return Wallet_1.WalletImpl; } });
var Transaction_1 = require("./Transaction");
Object.defineProperty(exports, "TransactionImpl", { enumerable: true, get: function () { return Transaction_1.TransactionImpl; } });
Object.defineProperty(exports, "TransactionWithFeesImpl", { enumerable: true, get: function () { return Transaction_1.TransactionWithFeesImpl; } });
var FeeManager_1 = require("./FeeManager");
Object.defineProperty(exports, "FeeManagerImpl", { enumerable: true, get: function () { return FeeManager_1.FeeManagerImpl; } });
var FeeBreakdown_1 = require("./FeeBreakdown");
Object.defineProperty(exports, "FeeBreakdownImpl", { enumerable: true, get: function () { return FeeBreakdown_1.FeeBreakdownImpl; } });
var CryptoUtils_1 = require("./CryptoUtils");
Object.defineProperty(exports, "CryptoUtils", { enumerable: true, get: function () { return CryptoUtils_1.CryptoUtils; } });
var ExternalWalletIntegration_1 = require("./ExternalWalletIntegration");
Object.defineProperty(exports, "ExternalWalletApp", { enumerable: true, get: function () { return ExternalWalletIntegration_1.ExternalWalletApp; } });
Object.defineProperty(exports, "ExternalWalletManager", { enumerable: true, get: function () { return ExternalWalletIntegration_1.ExternalWalletManager; } });
Object.defineProperty(exports, "UsdPaymentRequestWithWalletSelection", { enumerable: true, get: function () { return ExternalWalletIntegration_1.UsdPaymentRequestWithWalletSelection; } });
var UsdPaymentGateway_1 = require("./UsdPaymentGateway");
Object.defineProperty(exports, "UsdPaymentGateway", { enumerable: true, get: function () { return UsdPaymentGateway_1.UsdPaymentGateway; } });
Object.defineProperty(exports, "UsdPaymentRequest", { enumerable: true, get: function () { return UsdPaymentGateway_1.UsdPaymentRequest; } });
Object.defineProperty(exports, "ConfirmedUsdPayment", { enumerable: true, get: function () { return UsdPaymentGateway_1.ConfirmedUsdPayment; } });
Object.defineProperty(exports, "UsdPaymentDetails", { enumerable: true, get: function () { return UsdPaymentGateway_1.UsdPaymentDetails; } });
Object.defineProperty(exports, "CurrencyConverter", { enumerable: true, get: function () { return UsdPaymentGateway_1.CurrencyConverter; } });
var GameIntegration_1 = require("./GameIntegration");
Object.defineProperty(exports, "GameIntegration", { enumerable: true, get: function () { return GameIntegration_1.GameIntegration; } });
var UserWalletConfig_1 = require("./UserWalletConfig");
Object.defineProperty(exports, "UserWalletManager", { enumerable: true, get: function () { return UserWalletConfig_1.UserWalletManager; } });
__exportStar(require("./types"), exports);
const FreetimePaymentSDK_2 = require("./FreetimePaymentSDK");
exports.default = FreetimePaymentSDK_2.FreetimePaymentSDK;
//# sourceMappingURL=index.js.map