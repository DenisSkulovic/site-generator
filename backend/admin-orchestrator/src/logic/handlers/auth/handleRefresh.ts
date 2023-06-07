import {AuthManager} from "@auth_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleRefresh = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<{accessToken: string}> => {
    // TODO check this, maybe use body, or different header name, or query param
    const refreshToken: string = event.headers['AUTHORIZATION']
    if (!refreshToken) throw new Error("AUTHORIZATION is a mandatory header")
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw new Error("JWT_SECRET is a mandatory env param")

    const auth = new AuthManager(jwtSecret, process.env.DEFAULT_TOKEN_EXPIRY || "3h")
    const accessToken = auth.refreshAccessToken(refreshToken)
    return {
        accessToken,
    }
}

export default handleRefresh