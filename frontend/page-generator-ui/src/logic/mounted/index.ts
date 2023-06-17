import readUrl from "./readUrl"
import type { UrlParams } from "./readUrl"
import type { PageConfig, PageContent, PageHTMLObject, GeneratePageResponse, LangEnum } from "../../../../../page_cls_module/src"
import getPageContent from "../../api/pageContent/getContent"
import getPageConfig from "../../api/pageConfig/getConfig"
import generatePage from "@/api/pageGenerator/generatePage"
import { currentPageConfig } from "@/state/pageConfigState"
import { currentPageContent } from "@/state/pageContentState"
import { currentPageHTMLObject } from "@/state/pageHTMLObjectState"
import resetPageContent from "../pageContent/resetPageContent"
import resetPageConfig from "../pageConfig/resetPageConfig"
import resetPageHTMLObject from "../pageHTMLObject/resetPageHTMLObject"
import getPagemeta from "@/api/pagemeta/getPagemeta"
import pagemeta from "@/state/pagemeta"


const mounted = async () => {
    const urlParams: UrlParams = readUrl()

    const path: string = urlParams.path
    const lang: LangEnum = urlParams.lang

    pagemeta.value = await getPagemeta(path, lang)
    const [pageContent, pageConfig]: [
        PageContent,
        PageConfig,
    ] = await Promise.all([
        getPageContent(pagemeta.value.contentUUID),
        getPageConfig(pagemeta.value.configUUID),
    ])
    
    currentPageContent.value = pageContent
    currentPageConfig.value = pageConfig

    const resp: GeneratePageResponse = await generatePage(
        pageConfig,
        pageContent,
    )
    const pageHTMLObject: PageHTMLObject = resp.data
    currentPageHTMLObject.value = pageHTMLObject

    resetPageContent()
    resetPageConfig()
    resetPageHTMLObject()
}

export default mounted