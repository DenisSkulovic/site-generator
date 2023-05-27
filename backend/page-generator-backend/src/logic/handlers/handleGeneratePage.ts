import * as DTO from "../../../../../page_cls_module"
import constructPage from "../page-builder/page/constructPage"
import fetchFooter from "../page-builder/footer/fetchFooterFromDynamo"
import fetchHeader from "../page-builder/header/fetchHeaderFromDynamo"

const handleGeneratePage = async (
    requestData: DTO.GeneratePageRequest,
): Promise<DTO.GeneratePageResponse> => {
    console.log(`>>> handleGeneratePage`)

    const content: DTO.PageContent = requestData.content
    const config: DTO.PageConfig = requestData.config

    const promises: [Promise<DTO.HeaderHTMLObject | undefined>, Promise<DTO.FooterHTMLObject | undefined>] = [
        fetchHeader(config.headerId),
        fetchFooter(config.footerId),
    ]

    const [headerHTMLObject, footerHTMLObject] = await Promise.all(promises)

    if (!headerHTMLObject) throw new Error("failed to fetch header")
    if (!footerHTMLObject) throw new Error("failed to fetch footer")

    const pageHTMLObject: DTO.PageHTMLObject = await constructPage(
        content,
        config,
        headerHTMLObject,
        footerHTMLObject,
    )

    const resp: DTO.GeneratePageResponse = new DTO.GeneratePageResponse(
        pageHTMLObject
    )
    console.log(`handleGeneratePage resp`, resp)
    
    console.log(`<<< handleGeneratePage`)
    return resp
}

export default handleGeneratePage