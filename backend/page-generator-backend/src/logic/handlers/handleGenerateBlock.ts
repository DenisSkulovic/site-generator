import { BlockConfig, BlockContent, BlockHTMLObject, GenerateBlockRequest, GenerateBlockResponse } from "@page_cls_module"
import constructBlock from "../page-builder/page/constructBlock"

const handleGenerateBlock = async (
    requestData: GenerateBlockRequest,
): Promise<GenerateBlockResponse> => {
    console.log(`>>> handleGenerateBlock`)

    const config: BlockConfig = requestData.config
    const content: BlockContent = requestData.content

    const blockHTMLObject: BlockHTMLObject = await constructBlock(
        content,
        config,
    )

    const res: GenerateBlockResponse = new GenerateBlockResponse(
        blockHTMLObject
    )
    console.log(`handleGenerateBlock res`, res)

    console.log(`<<< handleGenerateBlock`)
    return res
}

export default handleGenerateBlock