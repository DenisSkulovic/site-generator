import { constructPage } from "../../page-builder/page/constructPage";
import fetchFooter from "../../page-builder/footer/fetchFooterFromS3";
import fetchHeader from "../../page-builder/header/fetchHeaderFromS3";
import handleGeneratePage from "../handleGeneratePage";
import { createPageContent, createPageConfig, createHeaderHTMLObject, createFooterHTMLObject, createGeneratePageRequest, createGeneratePageResponse, createPageHTMLObject } from "../../../../../../page_cls_module/src/mockFactories";

// Mock dependencies
jest.mock("../page-builder/page/constructPage");
jest.mock("../page-builder/page/constructArea");
jest.mock("../page-builder/footer/fetchFooterFromS3");
jest.mock("../page-builder/header/fetchHeaderFromS3");

// Importing factories

describe('handleGeneratePage', () => {
    const mockPageContent = createPageContent({});
    const mockPageConfig = createPageConfig({});
    const mockHeader = createHeaderHTMLObject({});
    const mockFooter = createFooterHTMLObject({});
    const mockPageHTMLObject = createPageHTMLObject({});
    const mockRequest = createGeneratePageRequest({
        content: mockPageContent,
        config: mockPageConfig
    });
    const mockResponse = createGeneratePageResponse({
        data: mockPageHTMLObject
    });

    it('should handle page generation successfully', async () => {
        // Mock implementations
        fetchHeader.mockResolvedValue(mockHeader);
        fetchFooter.mockResolvedValue(mockFooter);
        constructPage.mockResolvedValue(mockPageHTMLObject);

        const response = await handleGeneratePage(mockRequest);

        expect(response).toEqual(mockResponse);
    });

    it('should throw an error when header fetch fails', async () => {
        fetchHeader.mockResolvedValue(undefined); // cause fetchHeader to fail

        await expect(handleGeneratePage(mockRequest)).rejects.toThrow("failed to fetch header");
    });

    it('should throw an error when footer fetch fails', async () => {
        fetchHeader.mockResolvedValue(mockHeader); // ensure header fetch succeeds
        fetchFooter.mockResolvedValue(undefined); // cause fetchFooter to fail

        await expect(handleGeneratePage(mockRequest)).rejects.toThrow("failed to fetch footer");
    });
});
