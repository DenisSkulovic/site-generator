import * as DTO from "../../../../../page_cls_module"
import constructBlock from "../page-builder/page/constructBlock"

const handleGenerateBlock = async (
    requestData: DTO.GenerateBlockRequest,
): Promise<DTO.GenerateBlockResponse> => {
    console.log(`>>> handleGenerateBlock`)

    const config: DTO.BlockConfig = requestData.config
    const content: DTO.BlockContent = requestData.content

    const blockHTMLObject: DTO.BlockHTMLObject = await constructBlock(
        content,
        config,
    )

    const res: DTO.GenerateBlockResponse = new DTO.GenerateBlockResponse(
        blockHTMLObject
    )
    console.log(`handleGenerateBlock res`, res)

    console.log(`<<< handleGenerateBlock`)
    return res
}

export default handleGenerateBlock