import readUrl from "./readUrl"
import type { UrlParams } from "./readUrl"
import type { PageConfig, PageContent, PageHTMLObject, GeneratePageResponse } from "../../../../../page_cls_module/src"
import getPageContent from "../../api/pageContent/getContent"
import getPageConfig from "../../api/pageConfig/getConfig"
import getPageHTMLObject from "../../api/pageHTMLObject/getPageHTMLObject"
import generatePage from "@/api/pageGenerator/generatePage"
import currentPageConfig from "@/state/pageConfig/currentPageConfig"
import currentPageContent from "@/state/pageContent/currentPageContent"
import currentPageHTMLObject from "@/state/pageHTMLObject/currentPageHTMLObject"
import getNewPageConfig from "../pageConfig/getNewPageConfig"
import getNewPageContent from "../pageContent/getNewPageContent"
import resetPageContent from "../pageContent/resetPageContent"
import resetPageConfig from "../pageConfig/resetPageConfig"
import resetPageHTMLObject from "../pageHTMLObject/resetPageHTMLObject"


const handleNewPage = async () => {
    console.log(`handleNewPage`)
    const pageContent: PageContent = getNewPageContent()
    const pageConfig: PageConfig = getNewPageConfig(pageContent.uuid)
    currentPageContent.value = pageContent
    currentPageConfig.value = pageConfig

    console.log(`pageContent`, pageContent)
    console.log(`pageConfig`, pageConfig)

    const resp: GeneratePageResponse = await generatePage(
        pageConfig,
        pageContent,
    )
    const pageHTMLObject: PageHTMLObject = resp.data

    currentPageHTMLObject.value = pageHTMLObject
}

const handleExistingPage = async (
    page_content_uuid: string,
    page_config_uuid: string,
    page_html_object_uuid: string | undefined,
    page_url: string | undefined,
) => {
    console.log(`handleExistingPage`)
    const [pageContent, pageConfig]: [
        PageContent,
        PageConfig,
    ] = await Promise.all([
        getPageContent(page_content_uuid),
        getPageConfig(page_config_uuid),
    ])
    currentPageContent.value = pageContent
    currentPageConfig.value = pageConfig

    if (page_html_object_uuid) {
        const pageHTMLObject: PageHTMLObject = await getPageHTMLObject(page_html_object_uuid)
        currentPageHTMLObject.value = pageHTMLObject
    } else {
        const resp: GeneratePageResponse = await generatePage(
            pageConfig,
            pageContent,
        )
        const pageHTMLObject: PageHTMLObject = resp.data
        currentPageHTMLObject.value = pageHTMLObject
    }
}


const mounted = async () => {
    const urlParams: UrlParams = readUrl()

    const page_config_uuid: string | undefined = urlParams.page_config_uuid
    const page_content_uuid: string | undefined = urlParams.page_content_uuid
    const page_html_object_uuid: string | undefined = urlParams.page_html_object_uuid
    const page_url: string | undefined = urlParams.page_url

    const isNewPage: boolean = !page_config_uuid && !page_content_uuid
    console.log(`isNewPage`, isNewPage)

    if (isNewPage) {
        await handleNewPage()
    } else {
        if (!page_content_uuid) throw new Error("page_content_uuid cannot be undefined when it is an existing page")
        if (!page_config_uuid) throw new Error("page_config_uuid cannot be undefined when it is an existing page")
        await handleExistingPage(
            page_content_uuid,
            page_config_uuid,
            page_html_object_uuid,
            page_url,
        )
    }

    resetPageContent()
    resetPageConfig()
    resetPageHTMLObject()
}

export default mounted