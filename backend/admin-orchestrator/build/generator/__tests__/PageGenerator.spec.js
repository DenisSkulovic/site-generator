"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const PageGenerator_1 = require("../PageGenerator");
const mockFactories_1 = require("../../../../../page_cls_module/src/mockFactories");
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('PageGenerator', () => {
    let pageGenerator;
    const mockEnv = 'dev';
    const mockUrl = 'http://mock-url.com';
    beforeEach(() => {
        process.env.PAGE_GENERATOR_DEV = mockUrl;
        pageGenerator = new PageGenerator_1.PageGenerator(mockEnv);
    });
    it('should create an instance with the correct URL', () => {
        expect(pageGenerator).toBeDefined();
        expect(PageGenerator_1.PageGenerator.getPageGeneratorUrl(mockEnv)).toBe(mockUrl);
    });
    it('should call generateHeader correctly', async () => {
        const mockHeaderContent = (0, mockFactories_1.createHeaderContent)({});
        const mockHeaderConfig = (0, mockFactories_1.createHeaderConfig)({});
        const mockGenerateHeaderRequest = (0, mockFactories_1.createGenerateHeaderRequest)({ content: mockHeaderContent, config: mockHeaderConfig });
        const mockGenerateHeaderResponse = (0, mockFactories_1.createGenerateHeaderResponse)({});
        mockedAxios.post.mockResolvedValue({ data: mockGenerateHeaderResponse });
        const response = await pageGenerator.generateHeader(mockHeaderContent, mockHeaderConfig);
        expect(mockedAxios.post).toHaveBeenCalledWith(`${mockUrl}/generate-header`, mockGenerateHeaderRequest, {
            params: {},
            headers: {
                'Content-Type': 'application/json'
            },
        });
        expect(response).toEqual(mockGenerateHeaderResponse);
    });
    it('should call generateFooter correctly', async () => {
        const mockFooterContent = (0, mockFactories_1.createFooterContent)({});
        const mockFooterConfig = (0, mockFactories_1.createFooterConfig)({});
        const mockGenerateFooterRequest = (0, mockFactories_1.createGenerateFooterRequest)({ content: mockFooterContent, config: mockFooterConfig });
        const mockGenerateFooterResponse = (0, mockFactories_1.createGenerateFooterResponse)({});
        mockedAxios.post.mockResolvedValue({ data: mockGenerateFooterResponse });
        const response = await pageGenerator.generateFooter(mockFooterContent, mockFooterConfig);
        expect(mockedAxios.post).toHaveBeenCalledWith(`${mockUrl}/generate-footer`, mockGenerateFooterRequest, {
            params: {},
            headers: {
                'Content-Type': 'application/json'
            },
        });
        expect(response).toEqual(mockGenerateFooterResponse);
    });
    it('should call generatePage correctly', async () => {
        const mockPageContent = (0, mockFactories_1.createPageContent)({});
        const mockPageConfig = (0, mockFactories_1.createPageConfig)({});
        const mockGeneratePageRequest = (0, mockFactories_1.createGeneratePageRequest)({ content: mockPageContent, config: mockPageConfig });
        const mockGeneratePageResponse = (0, mockFactories_1.createGeneratePageResponse)({});
        mockedAxios.post.mockResolvedValue({ data: mockGeneratePageResponse });
        const response = await pageGenerator.generatePage(mockPageContent, mockPageConfig);
        expect(mockedAxios.post).toHaveBeenCalledWith(`${mockUrl}/generate-page`, mockGeneratePageRequest, {
            params: {},
            headers: {
                'Content-Type': 'application/json'
            },
        });
        expect(response).toEqual(mockGeneratePageResponse);
    });
});
//# sourceMappingURL=PageGenerator.spec.js.map