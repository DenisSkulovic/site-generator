import { APIGatewayEvent } from "aws-lambda";
import {handleLogin, handleRefresh} from '../';
import getEnvVariable from '@/logic/getEnvVariable';
import { AuthManager } from "../../../../../../s3_module/src";

jest.mock("@/logic/getEnvVariable");

// Mock the input data and environment variables.

process.env.ADMIN_USERNAME = 'admin'
process.env.ADMIN_PASSWORD = 'secret'
process.env.JWT_SECRET = 'a_secret_string'

describe('handleLogin', () => {
    it('creates and returns access and refresh tokens if credentials match', async () => {
        const event = {
            body: JSON.stringify({ username: 'admin', password: 'secret' }),
        } as unknown as APIGatewayEvent
        const tokens = await handleLogin(event, 'dev')
        expect(tokens).toHaveProperty('accessToken')
        expect(tokens).toHaveProperty('refreshToken')
    })

    it('throws an error if credentials do not match', async () => {
        const event = {
            body: JSON.stringify({ username: 'admin', password: 'secret' }),
        } as unknown as APIGatewayEvent
        process.env.ADMIN_USERNAME = 'another_user'
        await expect(handleLogin(event, 'dev')).rejects.toThrow('Invalid credentials')
        process.env.ADMIN_USERNAME = 'admin' // Reset the environment variable.
    })
})

describe("handleRefresh", () => {
    it("should throw an error when no refreshToken is found in the header", async () => {
        const event: APIGatewayEvent = { headers: {} } as unknown as APIGatewayEvent;
        const env: "dev" | "prod" = "dev";

        await expect(handleRefresh(event, env)).rejects.toThrow("AUTHORIZATION is a mandatory header");
    });

    it("should throw an error when access token cannot be refreshed", async () => {
        const event: APIGatewayEvent = { headers: { AUTHORIZATION: "refresh-token" } } as unknown as APIGatewayEvent;
        const env: "dev" | "prod" = "dev";

        jest.spyOn(getEnvVariable, "default").mockReturnValue("jwt-secret");

        jest.spyOn(AuthManager.prototype, "refreshAccessToken").mockReturnValue(null);

        await expect(handleRefresh(event, env)).rejects.toThrow("Access token could not be refreshed");
    });

    it("should refresh the access token when refresh token is provided", async () => {
        const event: APIGatewayEvent = { headers: { AUTHORIZATION: "refresh-token" } } as unknown as APIGatewayEvent;
        const env: "dev" | "prod" = "dev";

        jest.spyOn(getEnvVariable, "default").mockReturnValue("jwt-secret");

        jest.spyOn(AuthManager.prototype, "refreshAccessToken").mockReturnValue("access-token");

        const result = await handleRefresh(event, env);

        expect(result.accessToken).toEqual("access-token");
    });
});
