import { FooterService } from "@/service/FooterService"
import { HeaderService } from "@/service/HeaderService"
import adminUrl from "@/state/adminUrl"
import getEnvVariable from "./getEnvVariable";
import useLoading from "@/composables/useLoading";
import { pagemetasMapEdit } from "@/computed/pagemetas";
import { CloudFrontService, PagemetaService, SiteConfigService } from "@/service";
import type { Pagemeta } from "@admin_cls_module";
import isPageExistsError from "@/state/isPageExistsError"
import type { PageConfig, LangEnum, PageContent } from "../../../../page_cls_module/src";
import { getNewPageConfig, getNewPageContent, getNewPagemeta } from "./add-page";


export const handleResetLinks = () => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.resetLinks()
}

export const handleAddLink = (index?: number) => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.addLink(index)
}

export const handleDeleteLink = (index: number) => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.deleteLink(index)
}

export const handleResetHeader = () => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.resetHeader()
}

export const handleResetFooter = () => {
    const footerService = new FooterService(adminUrl.value)
    footerService.resetFooter()
}

export const handleRegenerateHeader = async () => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis()
    const headerService = new HeaderService(adminUrl.value)
    const res = await headerService.regenerateHeader()
    stopLoadingThis()
    return res
}

export const handleSaveFooter = async () => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis()

    const footerService = new FooterService(adminUrl.value)
    const res = await Promise.all([
        footerService.saveFooterContent(),
        footerService.saveFooterConfig(),
    ])
    stopLoadingThis()
    return res
}

export const handleRegenerateFooter = async () => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis()

    const footerService = new FooterService(adminUrl.value)
    const res = await footerService.regenerateFooter()
    stopLoadingThis()
    return res
}

export const handleSaveHeader = async () => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis()
    const headerService = new HeaderService(adminUrl.value)
    const res = await Promise.all([
        headerService.saveHeaderConfig(),
        headerService.saveHeaderContent(),
    ])
    stopLoadingThis()
    return res
}

export const handleAddNewPageClick = async (pagePath: string, lang: LangEnum) => {
    const pagemetaService = new PagemetaService(adminUrl.value)

    isPageExistsError.value = await pagemetaService.checkPageExists(pagePath, lang)
    if (isPageExistsError.value) return

    // create pagemeta object, page content and page config
    const pageContent: PageContent = getNewPageContent()
    const pageConfig: PageConfig = getNewPageConfig(pagePath, pageContent.uuid)
    const pagemeta: Pagemeta = getNewPagemeta(pagePath, lang, pageContent.uuid, pageConfig.uuid)

    await Promise.all([
        pagemetaService.createPageConfig(pageConfig),
        pagemetaService.createPageContent(pageContent),
        pagemetaService.createPagemeta(pagemeta, lang),
    ])

    handleOpenPageInEditor(pagePath, lang)
};

export const handleOpenPageInEditor = (pagePath: string, lang: LangEnum) => {
    const liveEditorUrl = getEnvVariable("VITE_APP_LIVE_EDITOR_URL")
    window.open(liveEditorUrl + `?path=${pagePath}&lang=${lang}`)
};

export const handleDeletePageClick = async (path: string) => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    let res
    if (window.confirm("Are you sure you want to delete this page?")) {
        try {
            const pagemetaService = new PagemetaService(adminUrl.value);
            const pagemeta: Pagemeta | undefined = pagemetasMapEdit.value.get(path)
            if (!pagemeta) throw new Error("pagemeta cannot be undefined")
            startLoadingThis();
            res = await pagemetaService.unpublishPage(pagemeta)
        } catch (err) {
            console.error(err);
            // Show error to the user
        } finally {
            stopLoadingThis();
        }
    }
    return res
};

export const handleRegenerateAllPages = async () => {
    const pagemetaService = new PagemetaService(adminUrl.value);
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis();
    await pagemetaService.regenerateAll();
    stopLoadingThis();
};

export const handleSaveSiteConfig = async () => {
    const siteConfigService: SiteConfigService = new SiteConfigService(adminUrl.value);
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis();
    await siteConfigService.saveSiteConfig();
    stopLoadingThis();
};


export const handleClearCloudFrontCache = async (regex: string = "*") => {
    const cloudFrontService: CloudFrontService = new CloudFrontService(adminUrl.value);
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis();
    await cloudFrontService.invalidateByRegex(regex)
    stopLoadingThis();
};