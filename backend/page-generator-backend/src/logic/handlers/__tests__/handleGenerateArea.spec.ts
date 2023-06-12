// @ts-nocheck
import { createAreaConfig, createAreaContent, createAreaHTMLObject, createGenerateAreaRequest, createGenerateAreaResponse } from "../../../../../../page_cls_module/src/mockFactories";
import constructArea from "../../page-builder/page/constructArea";
import handleGenerateArea from "../handleGenerateArea";

// Mock dependencies
jest.mock("../page-builder/page/constructArea");

// Importing factories

describe('handleGenerateArea', () => {
    const mockAreaConfig = createAreaConfig({});
    const mockAreaContent = createAreaContent({});
    const mockAreaHTMLObject = createAreaHTMLObject({
        config: mockAreaConfig,
        content: mockAreaContent
    });
    const mockRequest = createGenerateAreaRequest({
        config: mockAreaConfig,
        content: mockAreaContent
    });
    const mockResponse = createGenerateAreaResponse({
        data: mockAreaHTMLObject
    });

    it('should handle area generation successfully', async () => {
        // Mock implementation
        constructArea.mockResolvedValue(mockAreaHTMLObject);

        const response = await handleGenerateArea(mockRequest);

        expect(response).toEqual(mockResponse);
    });

    it('should throw an error when constructArea fails', async () => {
        constructArea.mockImplementation(() => {
            throw new Error('Failed to construct area');
        });

        await expect(handleGenerateArea(mockRequest)).rejects.toThrow('Failed to construct area');
    });
});
