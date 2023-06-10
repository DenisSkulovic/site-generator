import { APIGatewayEvent, Context } from "aws-lambda";
import { handler } from "../";

describe("handler", () => {
    it("should return a 200 response", async () => {
        const event: APIGatewayEvent = {
            httpMethod: "GET",
            resource: "/admin/site-config",
            headers: {},
            body: "",
            queryStringParameters: {},
            pathParameters: {},
            requestContext: {} as any,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            isBase64Encoded: false,
        } as unknown as APIGatewayEvent;
        const response = await handler(event, null as unknown as Context);
        expect(response.statusCode).toEqual(200);
    });

    it("should return a 404 response for an unknown path", async () => {
        const event: APIGatewayEvent = {
            httpMethod: "GET",
            resource: "/admin/unknown-path",
            headers: {},
            body: "",
            queryStringParameters: {},
            pathParameters: {},
            requestContext: {} as any,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            isBase64Encoded: false,
        } as unknown as APIGatewayEvent;
        const response = await handler(event, null as unknown as Context);
        expect(response.statusCode).toEqual(404);
    });
});
