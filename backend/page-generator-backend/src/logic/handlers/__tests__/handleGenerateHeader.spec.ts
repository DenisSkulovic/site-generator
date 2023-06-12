// @ts-nocheck
import {GenerateHeaderRequest, HeaderHTMLObject} from "@page_cls_module"
import generateHeaderHTML from "../../page-builder/header/generateHeaderHTML"
import handleGenerateHeader from "../handleGenerateHeader"
import { createGenerateHeaderRequest, createHeaderHTMLObject } from "../../../../../../page_cls_module/src/mockFactories"

// Mock dependencies
jest.mock("../page-builder/header/generateHeaderHTML")

describe('handleGenerateHeader', () => {
    it('should handle header generation successfully', async () => {
        const mockRequest: GenerateHeaderRequest = createGenerateHeaderRequest({});
        const mockHeaderHTMLObject: HeaderHTMLObject = createHeaderHTMLObject({});

        // Mock implementations
        generateHeaderHTML.mockResolvedValue(mockHeaderHTMLObject)

        const response = await handleGenerateHeader(mockRequest)

        expect(response).toBeInstanceOf(GenerateHeaderResponse)
        expect(response.data).toBe(mockHeaderHTMLObject)
        // Add more assertions as necessary
    })

    it('should throw an error when header generation fails', async () => {
        const mockRequest: GenerateHeaderRequest = createGenerateHeaderRequest({});

        generateHeaderHTML.mockResolvedValue(undefined) // cause generateHeaderHTML to fail

        await expect(handleGenerateHeader(mockRequest)).rejects.toThrow("Some error") // replace "Some error" with the expected error message
    })
})
