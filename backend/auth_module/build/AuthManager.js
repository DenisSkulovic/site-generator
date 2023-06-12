"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthManager {
    constructor(secretKey, tokenExpiry = '1h') {
        this.secretKey = secretKey;
        this.tokenExpiry = tokenExpiry;
        this.refreshTokens = new Set();
    }
    createToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: this.tokenExpiry });
    }
    createRefreshToken(payload) {
        const refreshToken = jsonwebtoken_1.default.sign(payload, this.secretKey);
        this.refreshTokens.add(refreshToken);
        return refreshToken;
    }
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
    refreshAccessToken(refreshToken) {
        if (!this.refreshTokens.has(refreshToken)) {
            return null;
        }
        const decoded = this.verifyToken(refreshToken);
        if (!decoded) {
            return null;
        }
        return this.createToken(decoded);
    }
    invalidateRefreshToken(refreshToken) {
        this.refreshTokens.delete(refreshToken);
    }
}
exports.AuthManager = AuthManager;
//# sourceMappingURL=AuthManager.js.map