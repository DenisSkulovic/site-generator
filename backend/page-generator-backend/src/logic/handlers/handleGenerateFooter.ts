import * as DTO from "../../../../../page_cls_module";
import generateFooterHTML from "../page-builder/footer/generateFooterHTML"


const handleGenerateFooter = async (requestData: DTO.GenerateFooterRequest): Promise<DTO.GenerateFooterResponse> => {
    console.log(`>>> handleGenerateFooter`)

    const content: DTO.FooterContent = requestData.content
    const config: DTO.FooterConfig = requestData.config

    const footerHTMLObject: DTO.FooterHTMLObject = await generateFooterHTML(
        config,
        content,
    )

    const resp: DTO.GenerateFooterResponse = new DTO.GenerateFooterResponse(
        footerHTMLObject
    )
    
    console.log(`handleGenerateFooter resp`, resp)
    console.log(`<<< handleGenerateFooter`)
    return resp
}

export default handleGenerateFooter