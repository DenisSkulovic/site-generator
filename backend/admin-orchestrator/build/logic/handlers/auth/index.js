"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRefresh = exports.handleLogin = void 0;
const _auth_module_1 = require("@auth_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const handleLogin = async (event, env) => {
    const { username, password } = JSON.parse(event.body || "{}");
    // Fetch mandatory environment variables.
    const adminUsername = (0, getEnvVariable_1.default)("ADMIN_USERNAME");
    const adminPassword = (0, getEnvVariable_1.default)("ADMIN_PASSWORD");
    const jwtSecret = (0, getEnvVariable_1.default)("JWT_SECRET");
    // Check if credentials match.
    if (adminUsername !== username || adminPassword !== password) {
        throw new Error("Invalid credentials");
    }
    const auth = new _auth_module_1.AuthManager(jwtSecret, process.env.DEFAULT_TOKEN_EXPIRY || "3h");
    const payload = {};
    const accessToken = auth.createToken(payload);
    const refreshToken = auth.createRefreshToken(payload);
    return {
        accessToken,
        refreshToken,
    };
};
exports.handleLogin = handleLogin;
const handleRefresh = async (event, env) => {
    const refreshToken = event.headers['AUTHORIZATION'];
    if (!refreshToken)
        throw new Error("AUTHORIZATION is a mandatory header");
    const jwtSecret = (0, getEnvVariable_1.default)("JWT_SECRET");
    const defaultTokenExpiry = (0, getEnvVariable_1.default)("DEFAULT_TOKEN_EXPIRY") || "3h";
    const auth = new _auth_module_1.AuthManager(jwtSecret, defaultTokenExpiry);
    const accessToken = auth.refreshAccessToken(refreshToken);
    if (!accessToken) {
        throw new Error("Access token could not be refreshed");
    }
    return {
        accessToken,
    };
};
exports.handleRefresh = handleRefresh;
//# sourceMappingURL=index.js.map