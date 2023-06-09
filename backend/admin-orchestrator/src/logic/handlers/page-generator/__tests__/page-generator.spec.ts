import { PageGenerator } from '@/generator/PageGenerator';
import { handleGenerateFooter, handleGenerateHeader, handleGeneratePage } from '../';
import { APIGatewayEvent } from "aws-lambda";
import { GenerateFooterResponse, GenerateHeaderResponse, GeneratePageResponse } from '../../../../../../../page_cls_module/src';

const mockEvent: APIGatewayEvent = {
    body: JSON.stringify({
        content: "mockContentStr",
        config: "mockConfigStr"
    })
} as APIGatewayEvent;
const mockEnv = "dev";

describe("handleGenerateFooter function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return footer", async () => {
        const mockResponse = {
            footer: "mockFooterStr"
        } as unknown as GenerateFooterResponse;
        jest.spyOn(PageGenerator.prototype, "generateFooter").mockImplementationOnce(() => Promise.resolve(mockResponse));

        const result = await handleGenerateFooter(mockEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });

    it("should return empty footer if no body content provided", async () => {
        const mockResponse = {
            footer: ""
        } as unknown as GenerateFooterResponse;
        jest.spyOn(PageGenerator.prototype, "generateFooter").mockImplementationOnce(() => Promise.resolve(mockResponse));

        const emptyContentEvent: APIGatewayEvent = {
            body: "{}"
        } as APIGatewayEvent;

        const result = await handleGenerateFooter(emptyContentEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });
});

describe("handleGenerateHeader function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return header", async () => {
        const mockResponse = {
            header: "mockHeaderStr"
        } as unknown as GenerateHeaderResponse;
        jest.spyOn(PageGenerator.prototype, "generateHeader").mockImplementationOnce(() => Promise.resolve(mockResponse));

        const result = await handleGenerateHeader(mockEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });

    it("should return empty header if no body content provided", async () => {
        const mockResponse = {
            header: ""
        } as unknown as GenerateHeaderResponse;
        jest.spyOn(PageGenerator.prototype, "generateHeader").mockImplementationOnce(() => Promise.resolve(mockResponse));

        const emptyContentEvent: APIGatewayEvent = {
            body: "{}"
        } as APIGatewayEvent;

        const result = await handleGenerateHeader(emptyContentEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });
});

describe("handleGeneratePage function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return page", async () => {
        const mockResponse = {
            page: "mockPageStr"
        } as unknown as GeneratePageResponse;
        jest.spyOn(PageGenerator.prototype, "generatePage").mockImplementationOnce(() => Promise.resolve(mockResponse));

        const result = await handleGeneratePage(mockEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });

    it("should return empty page if no body content provided", async () => {
        const mockResponse = {
            page: ""
        } as unknown as GeneratePageResponse;
        jest.spyOn(PageGenerator.prototype, "generatePage").mockImplementationOnce(() => Promise.resolve(mockResponse));

        const emptyContentEvent: APIGatewayEvent = {
            body: "{}"
        } as APIGatewayEvent;

        const result = await handleGeneratePage(emptyContentEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });
});
