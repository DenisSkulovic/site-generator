import {AuthManager} from "@auth_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleLogin = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<{accessToken: string, refreshToken: string}> => {
    const body = JSON.parse(event.body || "{}")
    const username: string | undefined = body.username
    const password: string | undefined = body.password
    const adminUsername = process.env.ADMIN_USERNAME
    if (!adminUsername) throw new Error("ADMIN_USERNAME is a mandatory env param")
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) throw new Error("ADMIN_PASSWORD is a mandatory env param")
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw new Error("JWT_SECRET is a mandatory env param")

    if (adminUsername !== username || adminPassword !== password) throw new Error("Invalid credentials")

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