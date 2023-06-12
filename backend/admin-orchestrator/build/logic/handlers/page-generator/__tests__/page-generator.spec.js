"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const PageGenerator_1 = require("@/generator/PageGenerator");
const __1 = require("../");
const mockEvent = {
    body: JSON.stringify({
        content: "mockContentStr",
        config: "mockConfigStr"
    })
};
const mockEnv = "dev";
describe("handleGenerateFooter function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should return footer", async () => {
        const mockResponse = {
            footer: "mockFooterStr"
        };
        jest.spyOn(PageGenerator_1.PageGenerator.prototype, "generateFooter").mockImplementationOnce(() => Promise.resolve(mockResponse));
        const result = await (0, __1.handleGenerateFooter)(mockEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });
    it("should return empty footer if no body content provided", async () => {
        const mockResponse = {
            footer: ""
        };
        jest.spyOn(PageGenerator_1.PageGenerator.prototype, "generateFooter").mockImplementationOnce(() => Promise.resolve(mockResponse));
        const emptyContentEvent = {
            body: "{}"
        };
        const result = await (0, __1.handleGenerateFooter)(emptyContentEvent, mockEnv);
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
        };
        jest.spyOn(PageGenerator_1.PageGenerator.prototype, "generateHeader").mockImplementationOnce(() => Promise.resolve(mockResponse));
        const result = await (0, __1.handleGenerateHeader)(mockEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });
    it("should return empty header if no body content provided", async () => {
        const mockResponse = {
            header: ""
        };
        jest.spyOn(PageGenerator_1.PageGenerator.prototype, "generateHeader").mockImplementationOnce(() => Promise.resolve(mockResponse));
        const emptyContentEvent = {
            body: "{}"
        };
        const result = await (0, __1.handleGenerateHeader)(emptyContentEvent, mockEnv);
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
        };
        jest.spyOn(PageGenerator_1.PageGenerator.prototype, "generatePage").mockImplementationOnce(() => Promise.resolve(mockResponse));
        const result = await (0, __1.handleGeneratePage)(mockEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });
    it("should return empty page if no body content provided", async () => {
        const mockResponse = {
            page: ""
        };
        jest.spyOn(PageGenerator_1.PageGenerator.prototype, "generatePage").mockImplementationOnce(() => Promise.resolve(mockResponse));
        const emptyContentEvent = {
            body: "{}"
        };
        const result = await (0, __1.handleGeneratePage)(emptyContentEvent, mockEnv);
        expect(result).toEqual(mockResponse);
    });
});
//# sourceMappingURL=page-generator.spec.js.map