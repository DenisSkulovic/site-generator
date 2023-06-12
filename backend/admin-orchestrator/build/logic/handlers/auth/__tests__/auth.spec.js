"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const _auth_module_1 = require("@auth_module");
jest.mock("@/logic/getEnvVariable");
describe("handleLogin", () => {
    // Clean up the mocked environment variables after each test.
    afterEach(() => {
        process.env.ADMIN_USERNAME = "admin";
    });
    it("creates and returns access and refresh tokens if credentials match", async () => {
        const event = {
            body: JSON.stringify({ username: "admin", password: "secret" }),
            headers: {},
        };
        const tokens = await (0, __1.handleLogin)(event, "dev");
        expect(tokens).toHaveProperty("accessToken");
        expect(tokens).toHaveProperty("refreshToken");
    });
    it("throws an error if credentials do not match", async () => {
        const event = {
            body: JSON.stringify({ username: "admin", password: "secret" }),
            headers: {},
        };
        process.env.ADMIN_USERNAME = "another_user";
        await expect((0, __1.handleLogin)(event, "dev")).rejects.toThrow("Invalid credentials");
    });
});
describe("handleRefresh", () => {
    // Clean up the mocked environment variables and functions after each test.
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("should throw an error when no refreshToken is found in the header", async () => {
        const event = {
            headers: {},
        };
        await expect((0, __1.handleRefresh)(event, "dev")).rejects.toThrow("AUTHORIZATION is a mandatory header");
    });
    it("should throw an error when access token cannot be refreshed", async () => {
        const event = {
            headers: { AUTHORIZATION: "refresh-token" },
        };
        jest.spyOn(getEnvVariable_1.default, "default").mockReturnValue("jwt-secret");
        jest
            .spyOn(_auth_module_1.AuthManager.prototype, "refreshAccessToken")
            .mockReturnValue(null);
        await expect((0, __1.handleRefresh)(event, "dev")).rejects.toThrow("Access token could not be refreshed");
    });
    it("should refresh the access token when refresh token is provided", async () => {
        const event = {
            headers: { AUTHORIZATION: "refresh-token" },
        };
        jest.spyOn(getEnvVariable_1.default, "default").mockReturnValue("jwt-secret");
        jest.spyOn(_auth_module_1.AuthManager.prototype, "refreshAccessToken").mockReturnValue("access-token");
        const result = await (0, __1.handleRefresh)(event, "dev");
        expect(result.accessToken).toEqual("access-token");
    });
});
//# sourceMappingURL=auth.spec.js.map