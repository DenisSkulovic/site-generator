import readUrl from "./readUrl"
import type { UrlParams } from "./readUrl"
import type { PageConfig, PageContent, PageHTMLObject, GeneratePageResponse, LangEnum, PageVersion } from "../../../../../page_cls_module/build_browser"
import pagemeta from "@/state/pagemeta"
import pagePath from "@/state/pagePath"
import { pageVersionService, pageContentService, pageConfigService, pageHTMLObjectService, generatorService, pagemetaService, nestableService } from "@/computed/services"
import { nextTick } from "vue"
import lang from "@/state/lang"
import type { Pagemeta } from "../../../../../admin_cls_module/build_browser"
import pageVersion from "@/state/pageVersion"



const mounted = async () => {
    const urlParams: UrlParams = readUrl()

    const path: string = urlParams.path
    const langStr: LangEnum = urlParams.lang
    const versionTagQuery: string | undefined = urlParams.versionTag

    pagePath.value = path
    lang.value = langStr
    const pagemetaObj: Pagemeta = await pagemetaService.value.getPagemeta(path, langStr)
    const versionTag = versionTagQuery || pagemetaObj.versionTag
    const pageVersionObj: PageVersion = await pageVersionService.value.getPageVersion(versionTag)

    if (!pagemeta.value) throw new Error("pagemeta.value cannot be undefined")
    if (!pageVersion.value) throw new Error("pageVersion.value cannot be undefined")
    
    const [pageContent, pageConfig]: [
        PageContent,
        PageConfig,
    ] = await Promise.all([
        pageContentService.value.getContent(pageVersionObj.contentUUID),
        pageConfigService.value.getConfig(pageVersionObj.configUUID),
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

    nextTick(nestableService.value.setNestableConfigFromData)
}

export default mounted