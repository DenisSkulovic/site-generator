"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const _page_cls_module_1 = require("@page_cls_module");
const handleGenerateFooter_1 = __importDefault(require("../handleGenerateFooter"));
const generateFooterHTML_1 = __importDefault(require("../../page-builder/footer/generateFooterHTML"));
const mockFactories_1 = require("../../../../../../page_cls_module/src/mockFactories");
// Mock dependencies
jest.mock("../page-builder/footer/generateFooterHTML");
describe('handleGenerateFooter', () => {
    it('should handle footer generation successfully', async () => {
        const mockFooterConfig = (0, mockFactories_1.createFooterConfig)({ /* your mock data here */});
        const mockFooterContent = (0, mockFactories_1.createFooterContent)({ /* your mock data here */});
        const mockFooterHTMLObject = (0, mockFactories_1.createFooterHTMLObject)({ /* your mock data here */});
        const mockRequest = (0, mockFactories_1.createGenerateFooterRequest)({
            config: mockFooterConfig,
            content: mockFooterContent,
        });
        // Mock implementations
        generateFooterHTML_1.default.mockResolvedValue(mockFooterHTMLObject);
        const response = await (0, handleGenerateFooter_1.default)(mockRequest);
        expect(response).toBeInstanceOf(_page_cls_module_1.GenerateFooterResponse);
        expect(response.data).toBe(mockFooterHTMLObject);
        // Add more assertions as necessary
    });
    it('should throw an error when footer generation fails', async () => {
        const mockFooterConfig = (0, mockFactories_1.createFooterConfig)({ /* your mock data here */});
        const mockFooterContent = (0, mockFactories_1.createFooterContent)({ /* your mock data here */});
        const mockRequest = (0, mockFactories_1.createGenerateFooterRequest)({
            config: mockFooterConfig,
            content: mockFooterContent,
        });
        // Cause generateFooterHTML to fail
        generateFooterHTML_1.default.mockImplementation(() => {
            throw new Error("failed to generate footer");
        });
        await expect((0, handleGenerateFooter_1.default)(mockRequest)).rejects.toThrow("failed to generate footer");
    });
});
//# sourceMappingURL=handleGenerateFooter.spec.js.map