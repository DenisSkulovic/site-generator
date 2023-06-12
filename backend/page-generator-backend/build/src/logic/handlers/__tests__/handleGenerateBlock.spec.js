"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const _page_cls_module_1 = require("@page_cls_module");
const handleGenerateBlock_1 = __importDefault(require("../handleGenerateBlock"));
const constructBlock_1 = __importDefault(require("../../page-builder/page/constructBlock"));
const mockFactories_1 = require("../../../../../../page_cls_module/src/mockFactories");
// Mock dependencies
jest.mock("../page-builder/page/constructBlock");
describe('handleGenerateBlock', () => {
    it('should handle block generation successfully', async () => {
        const mockBlockConfig = (0, mockFactories_1.createBlockConfig)({});
        const mockBlockContent = (0, mockFactories_1.createBlockContent)({});
        const mockBlockHTMLObject = (0, mockFactories_1.createBlockHTMLObject)({});
        const mockRequest = (0, mockFactories_1.createGenerateBlockRequest)({
            config: mockBlockConfig,
            content: mockBlockContent,
        });
        // Mock implementations
        constructBlock_1.default.mockResolvedValue(mockBlockHTMLObject);
        const response = await (0, handleGenerateBlock_1.default)(mockRequest);
        expect(response).toBeInstanceOf(_page_cls_module_1.GenerateBlockResponse);
        expect(response.data).toBe(mockBlockHTMLObject);
        // Add more assertions as necessary
    });
    it('should throw an error when block construction fails', async () => {
        const mockBlockConfig = (0, mockFactories_1.createBlockConfig)({});
        const mockBlockContent = (0, mockFactories_1.createBlockContent)({});
        const mockRequest = (0, mockFactories_1.createGenerateBlockRequest)({
            config: mockBlockConfig,
            content: mockBlockContent,
        });
        // Cause constructBlock to fail
        constructBlock_1.default.mockImplementation(() => {
            throw new Error("failed to construct block");
        });
        await expect((0, handleGenerateBlock_1.default)(mockRequest)).rejects.toThrow("failed to construct block");
    });
});
//# sourceMappingURL=handleGenerateBlock.spec.js.map