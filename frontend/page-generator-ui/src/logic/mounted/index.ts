import readUrl from "./readUrl"
import type { UrlParams } from "./readUrl"
import type { PageConfig, PageContent, PageHTMLObject, GeneratePageResponse, LangEnum } from "../../../../../page_cls_module/build_browser"
import pagemeta from "@/state/pagemeta"
import pagePath from "@/state/pagePath"
import { pageContentService, pageConfigService, pageHTMLObjectService, generatorService, pagemetaService } from "@/computed/services"
import setNestableConfigFromData from "../nestable/setNestableConfigFromData"
import { nextTick } from "vue"
import lang from "@/state/lang"


const mounted = async () => {
    const urlParams: UrlParams = readUrl()

    const path: string = urlParams.path
    const langStr: LangEnum = urlParams.lang

    pagePath.value = path
    lang.value = langStr
    await pagemetaService.value.getPagemeta()

    if (!pagemeta.value) throw new Error("pagemeta.value cannot be undefined")
    
    const [pageContent, pageConfig]: [
        PageContent,
        PageConfig,
    ] = await Promise.all([
        pageContentService.value.getContent(pagemeta.value.contentUUID),
        pageConfigService.value.getConfig(pagemeta.value.configUUID),
    ])

    const resp: GeneratePageResponse = await generatorService.value.generatePage(
        pageConfig,
        pageContent,
    )
    const pageHTMLObject: PageHTMLObject = resp.data

    pageContentService.value.setPageContent(pageContent)
    pageConfigService.value.setPageConfig(pageConfig)
    pageHTMLObjectService.value.setPageHTMLObject(pageHTMLObject)

    pageHTMLObjectService.value.renderPageHTMLObject()

    nextTick(setNestableConfigFromData)
}

export default mounted