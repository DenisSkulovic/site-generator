"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateHeaderHTML_1 = __importDefault(require("../../page-builder/header/generateHeaderHTML"));
const handleGenerateHeader_1 = __importDefault(require("../handleGenerateHeader"));
const mockFactories_1 = require("../../../../../../page_cls_module/src/mockFactories");
// Mock dependencies
jest.mock("../page-builder/header/generateHeaderHTML");
describe('handleGenerateHeader', () => {
    it('should handle header generation successfully', async () => {
        const mockRequest = (0, mockFactories_1.createGenerateHeaderRequest)({});
        const mockHeaderHTMLObject = (0, mockFactories_1.createHeaderHTMLObject)({});
        // Mock implementations
        generateHeaderHTML_1.default.mockResolvedValue(mockHeaderHTMLObject);
        const response = await (0, handleGenerateHeader_1.default)(mockRequest);
        expect(response).toBeInstanceOf(GenerateHeaderResponse);
        expect(response.data).toBe(mockHeaderHTMLObject);
        // Add more assertions as necessary
    });
    it('should throw an error when header generation fails', async () => {
        const mockRequest = (0, mockFactories_1.createGenerateHeaderRequest)({});
        generateHeaderHTML_1.default.mockResolvedValue(undefined); // cause generateHeaderHTML to fail
        await expect((0, handleGenerateHeader_1.default)(mockRequest)).rejects.toThrow("Some error"); // replace "Some error" with the expected error message
    });
});
//# sourceMappingURL=handleGenerateHeader.spec.js.map