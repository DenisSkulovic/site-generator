// @ts-nocheck
import { APIGatewayEvent } from "aws-lambda";
import { handleLogin, handleRefresh } from "../";
import getEnvVariable from "@/logic/getEnvVariable";
import { AuthManager } from "@auth_module";

jest.mock("@/logic/getEnvVariable");

// Define the type for the event object.
interface TestAPIGatewayEvent extends APIGatewayEvent {
    headers: {
        [key: string]: string;
    };
}

describe("handleLogin", () => {
    // Clean up the mocked environment variables after each test.
    afterEach(() => {
        process.env.ADMIN_USERNAME = "admin";
    });

    it("creates and returns access and refresh tokens if credentials match", async () => {
        const event: TestAPIGatewayEvent = {
            body: JSON.stringify({ username: "admin", password: "secret" }),
            headers: {},
        };

        const tokens = await handleLogin(event, "dev");

        expect(tokens).toHaveProperty("accessToken");
        expect(tokens).toHaveProperty("refreshToken");
    });

    it("throws an error if credentials do not match", async () => {
        const event: TestAPIGatewayEvent = {
            body: JSON.stringify({ username: "admin", password: "secret" }),
            headers: {},
        };

        process.env.ADMIN_USERNAME = "another_user";

        await expect(handleLogin(event, "dev")).rejects.toThrow(
            "Invalid credentials"
        );
    });
});

describe("handleRefresh", () => {
    // Clean up the mocked environment variables and functions after each test.
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should throw an error when no refreshToken is found in the header", async () => {
        const event: TestAPIGatewayEvent = {
            headers: {},
        };

        await expect(handleRefresh(event, "dev")).rejects.toThrow(
            "AUTHORIZATION is a mandatory header"
        );
    });

    it("should throw an error when access token cannot be refreshed", async () => {
        const event: TestAPIGatewayEvent = {
            headers: { AUTHORIZATION: "refresh-token" },
        };

        jest.spyOn(getEnvVariable, "default").mockReturnValue("jwt-secret");

        jest
            .spyOn(AuthManager.prototype, "refreshAccessToken")
            .mockReturnValue(null);

        await expect(handleRefresh(event, "dev")).rejects.toThrow(
            "Access token could not be refreshed"
        );
    });

    it("should refresh the access token when refresh token is provided", async () => {
        const event: TestAPIGatewayEvent = {
            headers: { AUTHORIZATION: "refresh-token" },
        };

        jest.spyOn(getEnvVariable, "default").mockReturnValue("jwt-secret");

        jest.spyOn(AuthManager.prototype, "refreshAccessToken").mockReturnValue(
            "access-token"
        );

        const result = await handleRefresh(event, "dev");

        expect(result.accessToken).toEqual("access-token");
    });
});
