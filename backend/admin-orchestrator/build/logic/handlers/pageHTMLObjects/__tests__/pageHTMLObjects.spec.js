"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const __1 = require("../");
const mockApiGatewayEvent = {
    httpMethod: '',
    headers: {},
    multiValueHeaders: {},
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    pathParameters: {},
    stageVariables: {},
    body: ''
};
const mockPageHTMLObject = {
    key: '',
    title: '',
    html: ''
};
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
        const event = {
            ...mockApiGatewayEvent,
            pathParameters: null
        };
        await expect((0, __1.handlePageHTMLObjectDelete)(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });
    test("should delete item successfully", async () => {
        const event = {
            ...mockApiGatewayEvent,
            pathParameters: { key: "" }
        };
        await expect((0, __1.handlePageHTMLObjectDelete)(event, "dev")).resolves.toBeUndefined();
        expect(mockRepoDeleteItem).toHaveBeenCalledTimes(1);
    });
});
describe('handlePageHTMLObjectGet', () => {
    test("should throw error when key is not present in path parameters", async () => {
        const event = {
            ...mockApiGatewayEvent,
            pathParameters: null
        };
        await expect((0, __1.handlePageHTMLObjectGet)(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });
    test("should get item successfully", async () => {
        const event = {
            ...mockApiGatewayEvent,
            pathParameters: { key: "" }
        };
        await expect((0, __1.handlePageHTMLObjectGet)(event, "dev")).resolves.toEqual(mockPageHTMLObject);
        expect(mockRepoGetItem).toHaveBeenCalledTimes(1);
    });
});
describe('handlePageHTMLObjectGetAll', () => {
    test("should get all items successfully", async () => {
        await expect((0, __1.handlePageHTMLObjectGetAll)(mockApiGatewayEvent, "dev")).resolves.toEqual([mockPageHTMLObject]);
        expect(mockRepoGetAllItems).toHaveBeenCalledTimes(1);
    });
});
describe('handlePageHTMLObjectPost', () => {
    test("should throw error when key is not present in query string parameters", async () => {
        const event = {
            ...mockApiGatewayEvent,
            queryStringParameters: null
        };
        await expect((0, __1.handlePageHTMLObjectPost)(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });
    test("should put item successfully", async () => {
        const event = {
            ...mockApiGatewayEvent,
            queryStringParameters: { key: "" },
            body: JSON.stringify(mockPageHTMLObject)
        };
        await expect((0, __1.handlePageHTMLObjectPost)(event, "dev")).resolves.toBeUndefined();
        expect(mockRepoPutItem).toHaveBeenCalledTimes(1);
    });
});
describe('handlePageHTMLObjectPut', () => {
    test("should throw error when key is not present in query string parameters", async () => {
        const event = {
            ...mockApiGatewayEvent,
            queryStringParameters: null
        };
        await expect((0, __1.handlePageHTMLObjectPut)(event, "dev")).rejects.toThrow("key is a mandatory query string param");
    });
    test("should put item successfully", async () => {
        const event = {
            ...mockApiGatewayEvent,
            queryStringParameters: { key: "" },
            body: JSON.stringify(mockPageHTMLObject)
        };
        await expect((0, __1.handlePageHTMLObjectPut)(event, "dev")).resolves.toBeUndefined();
        expect(mockRepoPutItem).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=pageHTMLObjects.spec.js.map