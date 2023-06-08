import { APIGatewayEvent } from "aws-lambda";
import { AuthManager } from "@auth_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleRefresh = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<{ accessToken: string }> => {
    const refreshToken: string = event.headers['AUTHORIZATION'];
    if (!refreshToken) throw new Error("AUTHORIZATION is a mandatory header");

    const jwtSecret = getEnvVariable("JWT_SECRET");
    const defaultTokenExpiry = getEnvVariable("DEFAULT_TOKEN_EXPIRY") || "3h";

    const auth = new AuthManager(jwtSecret, defaultTokenExpiry);
    const accessToken = auth.refreshAccessToken(refreshToken);

    if (!accessToken) {
        throw new Error("Access token could not be refreshed");
    }

    return {
        accessToken,
    };
}

export default handleRefresh;
