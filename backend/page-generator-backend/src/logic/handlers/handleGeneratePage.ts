import { FooterHTMLObject, GeneratePageRequest, GeneratePageResponse, HeaderHTMLObject, PageConfig, PageContent, PageHTMLObject } from "@page_cls_module"
import {constructPage} from "../page-builder/page/constructPage"
import constructArea from "../page-builder/page/constructArea"
import fetchFooter from "../page-builder/footer/fetchFooterFromS3"
import fetchHeader from "../page-builder/header/fetchHeaderFromS3"
import guid from "@/utils/guid"

const handleGeneratePage = async (
    requestData: GeneratePageRequest,
): Promise<GeneratePageResponse> => {
    console.log(`>>> handleGeneratePage`)

    const content: PageContent = requestData.content
    const config: PageConfig = requestData.config

    const promises: [Promise<string | undefined>, Promise<string | undefined>] = [
        fetchHeader(),
        fetchFooter(),
    ]

    const [headerHTML, footerHTML] = await Promise.all(promises)

    if (!headerHTML) throw new Error("failed to fetch header")
    if (!footerHTML) throw new Error("failed to fetch footer")

    const pageHTMLObject: PageHTMLObject = await constructPage(
        content,
        config,
        headerHTML,
        footerHTML,
        __dirname,
        constructArea,
        guid,
    )

    const resp: GeneratePageResponse = new GeneratePageResponse(
        pageHTMLObject
    )
    console.log(`handleGeneratePage resp`, resp)
    
    console.log(`<<< handleGeneratePage`)
    return resp
}

export default handleGeneratePage