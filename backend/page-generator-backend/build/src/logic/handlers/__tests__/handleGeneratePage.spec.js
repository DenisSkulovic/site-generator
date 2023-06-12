"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const constructPage_1 = require("../../page-builder/page/constructPage");
const fetchFooterFromS3_1 = __importDefault(require("../../page-builder/footer/fetchFooterFromS3"));
const fetchHeaderFromS3_1 = __importDefault(require("../../page-builder/header/fetchHeaderFromS3"));
const handleGeneratePage_1 = __importDefault(require("../handleGeneratePage"));
const mockFactories_1 = require("../../../../../../page_cls_module/src/mockFactories");
// Mock dependencies
jest.mock("../page-builder/page/constructPage");
jest.mock("../page-builder/page/constructArea");
jest.mock("../page-builder/footer/fetchFooterFromS3");
jest.mock("../page-builder/header/fetchHeaderFromS3");
// Importing factories
describe('handleGeneratePage', () => {
    const mockPageContent = (0, mockFactories_1.createPageContent)({});
    const mockPageConfig = (0, mockFactories_1.createPageConfig)({});
    const mockHeader = (0, mockFactories_1.createHeaderHTMLObject)({});
    const mockFooter = (0, mockFactories_1.createFooterHTMLObject)({});
    const mockPageHTMLObject = (0, mockFactories_1.createPageHTMLObject)({});
    const mockRequest = (0, mockFactories_1.createGeneratePageRequest)({
        content: mockPageContent,
        config: mockPageConfig
    });
    const mockResponse = (0, mockFactories_1.createGeneratePageResponse)({
        data: mockPageHTMLObject
    });
    it('should handle page generation successfully', async () => {
        // Mock implementations
        fetchHeaderFromS3_1.default.mockResolvedValue(mockHeader);
        fetchFooterFromS3_1.default.mockResolvedValue(mockFooter);
        constructPage_1.constructPage.mockResolvedValue(mockPageHTMLObject);
        const response = await (0, handleGeneratePage_1.default)(mockRequest);
        expect(response).toEqual(mockResponse);
    });
    it('should throw an error when header fetch fails', async () => {
        fetchHeaderFromS3_1.default.mockResolvedValue(undefined); // cause fetchHeader to fail
        await expect((0, handleGeneratePage_1.default)(mockRequest)).rejects.toThrow("failed to fetch header");
    });
    it('should throw an error when footer fetch fails', async () => {
        fetchHeaderFromS3_1.default.mockResolvedValue(mockHeader); // ensure header fetch succeeds
        fetchFooterFromS3_1.default.mockResolvedValue(undefined); // cause fetchFooter to fail
        await expect((0, handleGeneratePage_1.default)(mockRequest)).rejects.toThrow("failed to fetch footer");
    });
});
//# sourceMappingURL=handleGeneratePage.spec.js.map