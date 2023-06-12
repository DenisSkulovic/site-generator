"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const mockFactories_1 = require("../../../../../../page_cls_module/src/mockFactories");
const constructArea_1 = __importDefault(require("../../page-builder/page/constructArea"));
const handleGenerateArea_1 = __importDefault(require("../handleGenerateArea"));
// Mock dependencies
jest.mock("../page-builder/page/constructArea");
// Importing factories
describe('handleGenerateArea', () => {
    const mockAreaConfig = (0, mockFactories_1.createAreaConfig)({});
    const mockAreaContent = (0, mockFactories_1.createAreaContent)({});
    const mockAreaHTMLObject = (0, mockFactories_1.createAreaHTMLObject)({
        config: mockAreaConfig,
        content: mockAreaContent
    });
    const mockRequest = (0, mockFactories_1.createGenerateAreaRequest)({
        config: mockAreaConfig,
        content: mockAreaContent
    });
    const mockResponse = (0, mockFactories_1.createGenerateAreaResponse)({
        data: mockAreaHTMLObject
    });
    it('should handle area generation successfully', async () => {
        // Mock implementation
        constructArea_1.default.mockResolvedValue(mockAreaHTMLObject);
        const response = await (0, handleGenerateArea_1.default)(mockRequest);
        expect(response).toEqual(mockResponse);
    });
    it('should throw an error when constructArea fails', async () => {
        constructArea_1.default.mockImplementation(() => {
            throw new Error('Failed to construct area');
        });
        await expect((0, handleGenerateArea_1.default)(mockRequest)).rejects.toThrow('Failed to construct area');
    });
});
//# sourceMappingURL=handleGenerateArea.spec.js.map