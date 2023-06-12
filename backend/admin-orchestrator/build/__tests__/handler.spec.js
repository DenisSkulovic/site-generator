"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
describe("handler", () => {
    it("should return a 200 response", async () => {
        const event = {
            httpMethod: "GET",
            resource: "/admin/site-config",
            headers: {},
            body: "",
            queryStringParameters: {},
            pathParameters: {},
            requestContext: {},
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            isBase64Encoded: false,
        };
        const response = await (0, __1.handler)(event, null);
        expect(response.statusCode).toEqual(200);
    });
    it("should return a 404 response for an unknown path", async () => {
        const event = {
            httpMethod: "GET",
            resource: "/admin/unknown-path",
            headers: {},
            body: "",
            queryStringParameters: {},
            pathParameters: {},
            requestContext: {},
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            isBase64Encoded: false,
        };
        const response = await (0, __1.handler)(event, null);
        expect(response.statusCode).toEqual(404);
    });
});
//# sourceMappingURL=handler.spec.js.map