import { handlePageHTMLObjectDelete, handlePageHTMLObjectGet, handlePageHTMLObjectGetAll, handlePageHTMLObjectPost, handlePageHTMLObjectPut } from "../";
import { APIGatewayEvent } from "aws-lambda";
import { PageHTMLObject } from "@page_cls_module";
import { PageHTMLRepository } from "@repository_module";

const mockApiGatewayEvent: APIGatewayEvent = {
    httpMethod: '',
    headers: {},
    multiValueHeaders: {},
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    pathParameters: {},
    stageVariables: {},
    body: ''
} as unknown as APIGatewayEvent;

const mockPageHTMLObject: PageHTMLObject = {
    key: '',
    title: '',
    html: ''
} as unknown as PageHTMLObject;

const mockRepoGetItem = jest.fn().mockImplementation(() => Promise.resolve(mockPageHTMLObject));
const mockRepoGetAllItems = jest.fn().mockImplementation(() => Promise.resolve([mockPageHTMLObject]));
const mockRepoPutItem = jest.fn().mockImplementation(() => Promise.resolve());
const mockRepoDeleteItem = jest.fn().mockImplementation(() => Promise.resolve());

jest.mock("@repository_module", () => {
    return {
        PageHTMLRepository: jest.fn().mockImplementation(() => {
            return {
                getItem: mockRepoGetItem,
                getAllItems: mockRepoGetAllItems,
                putItem: mockRepoPutItem,
                deleteItem: mockRepoDeleteItem
            };
        })
    };
});

describe('handlePageHTMLObjectDelete', () => {
    test("should throw error when key is not present in path parameters", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            pathParameters: null
        };
        await expect(handlePageHTMLObjectDelete(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });

    test("should delete item successfully", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            pathParameters: { key: "" }
        };
        await expect(handlePageHTMLObjectDelete(event, "dev")).resolves.toBeUndefined();
        expect(mockRepoDeleteItem).toHaveBeenCalledTimes(1);
    });
});

describe('handlePageHTMLObjectGet', () => {
    test("should throw error when key is not present in path parameters", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            pathParameters: null
        };
        await expect(handlePageHTMLObjectGet(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });

    test("should get item successfully", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            pathParameters: { key: "" }
        };
        await expect(handlePageHTMLObjectGet(event, "dev")).resolves.toEqual(mockPageHTMLObject);
        expect(mockRepoGetItem).toHaveBeenCalledTimes(1);
    });
});

describe('handlePageHTMLObjectGetAll', () => {
    test("should get all items successfully", async () => {
        await expect(handlePageHTMLObjectGetAll(mockApiGatewayEvent, "dev")).resolves.toEqual([mockPageHTMLObject]);
        expect(mockRepoGetAllItems).toHaveBeenCalledTimes(1);
    });
});

describe('handlePageHTMLObjectPost', () => {
    test("should throw error when key is not present in query string parameters", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            queryStringParameters: null
        };
        await expect(handlePageHTMLObjectPost(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });

    test("should put item successfully", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            queryStringParameters: { key: "" },
            body: JSON.stringify(mockPageHTMLObject)
        };
        await expect(handlePageHTMLObjectPost(event, "dev")).resolves.toBeUndefined();
        expect(mockRepoPutItem).toHaveBeenCalledTimes(1);
    });
});

describe('handlePageHTMLObjectPut', () => {
    test("should throw error when key is not present in query string parameters", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            queryStringParameters: null
        };
        await expect(handlePageHTMLObjectPut(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });

    test("should put item successfully", async () => {
        const event: APIGatewayEvent = {
            ...mockApiGatewayEvent,
            queryStringParameters: { key: "" },
            body: JSON.stringify(mockPageHTMLObject)
        };
        await expect(handlePageHTMLObjectPut(event, "dev")).resolves.toBeUndefined();
        expect(mockRepoPutItem).toHaveBeenCalledTimes(1);
    });
});
