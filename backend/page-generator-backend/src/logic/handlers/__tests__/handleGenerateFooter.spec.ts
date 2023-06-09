import { FooterConfig, FooterContent, FooterHTMLObject, GenerateFooterRequest, GenerateFooterResponse } from "@page_cls_module";
import handleGenerateFooter from "../handleGenerateFooter";
import generateFooterHTML from "../../page-builder/footer/generateFooterHTML";
import { createFooterConfig, createFooterContent, createFooterHTMLObject, createGenerateFooterRequest } from "../../../../../../page_cls_module/src/mockFactories";

// Mock dependencies
jest.mock("../page-builder/footer/generateFooterHTML");

describe('handleGenerateFooter', () => {
    it('should handle footer generation successfully', async () => {
        const mockFooterConfig: FooterConfig = createFooterConfig({/* your mock data here */});
        const mockFooterContent: FooterContent = createFooterContent({/* your mock data here */});
        const mockFooterHTMLObject: FooterHTMLObject = createFooterHTMLObject({/* your mock data here */});
        const mockRequest: GenerateFooterRequest = createGenerateFooterRequest({
            config: mockFooterConfig,
            content: mockFooterContent,
        });

        // Mock implementations
        generateFooterHTML.mockResolvedValue(mockFooterHTMLObject);

        const response = await handleGenerateFooter(mockRequest);

        expect(response).toBeInstanceOf(GenerateFooterResponse);
        expect(response.data).toBe(mockFooterHTMLObject);
        // Add more assertions as necessary
    })

    it('should throw an error when footer generation fails', async () => {
        const mockFooterConfig: FooterConfig = createFooterConfig({/* your mock data here */});
        const mockFooterContent: FooterContent = createFooterContent({/* your mock data here */});
        const mockRequest: GenerateFooterRequest = createGenerateFooterRequest({
            config: mockFooterConfig,
            content: mockFooterContent,
        });

        // Cause generateFooterHTML to fail
        generateFooterHTML.mockImplementation(() => {
            throw new Error("failed to generate footer")
        });

        await expect(handleGenerateFooter(mockRequest)).rejects.toThrow("failed to generate footer");
    })
})
