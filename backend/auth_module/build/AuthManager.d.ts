export declare class AuthManager {
    private readonly secretKey;
    private readonly tokenExpiry;
    private readonly refreshTokens;
    constructor(secretKey: string, tokenExpiry?: string);
    createToken(payload: Record<string, unknown>): string;
    createRefreshToken(payload: Record<string, unknown>): string;
    verifyToken(token: string): Record<string, unknown> | null;
    refreshAccessToken(refreshToken: string): string | null;
    invalidateRefreshToken(refreshToken: string): void;
}
//# sourceMappingURL=AuthManager.d.ts.map