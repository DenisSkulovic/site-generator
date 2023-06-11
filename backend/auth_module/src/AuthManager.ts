import jwt from 'jsonwebtoken';

export class AuthManager {
    private readonly secretKey: string;
    private readonly tokenExpiry: string;
    private readonly refreshTokens: Set<string>;

    constructor(secretKey: string, tokenExpiry = '1h') {
        this.secretKey = secretKey;
        this.tokenExpiry = tokenExpiry;
        this.refreshTokens = new Set();
    }

    createToken(payload: Record<string, unknown>): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.tokenExpiry });
    }

    createRefreshToken(payload: Record<string, unknown>): string {
        const refreshToken = jwt.sign(payload, this.secretKey);
        this.refreshTokens.add(refreshToken);
        return refreshToken;
    }

    verifyToken(token: string): Record<string, unknown> | null {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return decoded as Record<string, unknown>;
        } catch (error) {
            return null;
        }
    }

    refreshAccessToken(refreshToken: string): string | null {
        if (!this.refreshTokens.has(refreshToken)) {
            return null;
        }

        const decoded = this.verifyToken(refreshToken);
        if (!decoded) {
            return null;
        }

        return this.createToken(decoded);
    }

    invalidateRefreshToken(refreshToken: string): void {
        this.refreshTokens.delete(refreshToken);
    }
}