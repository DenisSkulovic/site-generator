import {AuthManager} from "@auth_module"
import {type APIGatewayEvent} from "aws-lambda"
import getEnvVariable from "@/logic/getEnvVariable"

const handleLogin = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<{accessToken: string, refreshToken: string}> => {
    const { username, password } = JSON.parse(event.body || "{}")

    // Fetch mandatory environment variables.
    const adminUsername = getEnvVariable("ADMIN_USERNAME")
    const adminPassword = getEnvVariable("ADMIN_PASSWORD")
    const jwtSecret = getEnvVariable("JWT_SECRET")

    // Check if credentials match.
    if (adminUsername !== username || adminPassword !== password) {
        throw new Error("Invalid credentials")
    }

    const auth = new AuthManager(jwtSecret, process.env.DEFAULT_TOKEN_EXPIRY || "3h")
    const payload = {}
    const accessToken = auth.createToken(payload)
    const refreshToken = auth.createRefreshToken(payload)

    return {
        accessToken,
        refreshToken,
    }
}

export default handleLogin