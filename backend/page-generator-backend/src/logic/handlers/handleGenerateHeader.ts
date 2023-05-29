import * as DTO from "@page_cls_module";
import generateHeaderHTML from "../page-builder/header/generateHeaderHTML"


const handleGenerateHeader = async (
    requestData: DTO.GenerateHeaderRequest,
): Promise<DTO.GenerateHeaderResponse> => {
    console.log(`>>> handleGenerateHeader`)

    const content: DTO.HeaderContent = requestData.content
    const config: DTO.HeaderConfig = requestData.config

    const headerHTMLObject: DTO.HeaderHTMLObject = await generateHeaderHTML(
        config,
        content,
    )
    const resp: DTO.GenerateHeaderResponse = new DTO.GenerateHeaderResponse(
        headerHTMLObject
    )
    console.log(`handleGenerateHeader resp`, resp)
    console.log(`<<< handleGenerateHeader`)
    return resp
}

export default handleGenerateHeader