// @ts-nocheck
import { BlockConfig, BlockContent, BlockHTMLObject, GenerateBlockRequest, GenerateBlockResponse } from "@page_cls_module"
import handleGenerateBlock from "../handleGenerateBlock"
import constructBlock from "../../page-builder/page/constructBlock"
import { createBlockConfig, createBlockContent, createGenerateBlockRequest, createBlockHTMLObject } from "../../../../../../page_cls_module/src/mockFactories"

// Mock dependencies
jest.mock("../page-builder/page/constructBlock")

describe('handleGenerateBlock', () => {
    it('should handle block generation successfully', async () => {
        const mockBlockConfig: BlockConfig = createBlockConfig({})
        const mockBlockContent: BlockContent = createBlockContent({})
        const mockBlockHTMLObject: BlockHTMLObject = createBlockHTMLObject({})
        const mockRequest: GenerateBlockRequest = createGenerateBlockRequest({
            config: mockBlockConfig,
            content: mockBlockContent,
        })

        // Mock implementations
        constructBlock.mockResolvedValue(mockBlockHTMLObject)

        const response = await handleGenerateBlock(mockRequest)

        expect(response).toBeInstanceOf(GenerateBlockResponse)
        expect(response.data).toBe(mockBlockHTMLObject)
        // Add more assertions as necessary
    })

    it('should throw an error when block construction fails', async () => {
        const mockBlockConfig: BlockConfig = createBlockConfig({})
        const mockBlockContent: BlockContent = createBlockContent({})
        const mockRequest: GenerateBlockRequest = createGenerateBlockRequest({
            config: mockBlockConfig,
            content: mockBlockContent,
        })

        // Cause constructBlock to fail
        constructBlock.mockImplementation(() => {
            throw new Error("failed to construct block")
        })

        await expect(handleGenerateBlock(mockRequest)).rejects.toThrow("failed to construct block")
    })
})
