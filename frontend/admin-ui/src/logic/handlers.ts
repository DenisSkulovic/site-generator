import { FooterService } from "@/service/FooterService"
import { HeaderService } from "@/service/HeaderService"
import adminUrl from "@/state/adminUrl"
import getEnvVariable from "./getEnvVariable";
import useLoading from "@/composables/useLoading";
import { pagemetasMapEdit } from "@/computed/pagemetas";
import { PageVersionService, CloudFrontService, PagemetaService, SiteConfigService } from "@/service";
import type { Pagemeta } from "@admin_cls_module";
import isPageExistsError from "@/state/isPageExistsError"
import type { PageConfig, LangEnum, PageContent, PageVersion } from "../../../../page_cls_module/src";
import { cloneDeep } from "lodash";
import { PublishingService } from "@/service/PublishingService";
import lang from "@/state/lang";


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

export const handleAddNewPageClick = async (pagePath: string, lang: LangEnum, isOpenInLiveEditor: boolean): Promise<boolean> => {
    const pagemetaService = new PagemetaService(adminUrl.value)

    isPageExistsError.value = await pagemetaService.checkPageExists(pagePath, lang)
    if (isPageExistsError.value) return false

    // create pagemeta object, page content and page config
    const pageContent: PageContent = pagemetaService.getNewPageContent()
    const pageConfig: PageConfig = pagemetaService.getNewPageConfig(pagePath, pageContent.uuid)
    const pageVersion: PageVersion = pagemetaService.getNewPageVersion("initial", pagePath, pageConfig.uuid, pageContent.uuid)
    const pagemeta: Pagemeta = pagemetaService.getNewPagemeta(pagePath, lang, pageVersion.tag)

    await Promise.all([
        pagemetaService.createPageConfig(pageConfig),
        pagemetaService.createPageContent(pageContent),
        pagemetaService.createPageVersion(pageVersion),
        pagemetaService.createPagemeta(pagemeta, lang),
    ])

    if (isOpenInLiveEditor) handleOpenPageInEditor(pagePath, lang)

    return true
};

export const handleOpenPageInEditor = (pagePath: string, lang: LangEnum, versionTag?: string | undefined) => {
    const liveEditorUrl = getEnvVariable("VITE_APP_LIVE_EDITOR_URL")
    let url = `${liveEditorUrl}?path=${pagePath}&lang=${lang}`
    if (versionTag) url += `&versionTag=${versionTag}`
    window.open(url)
};

export const handleDeleteVersionClick = async (pageVersion: PageVersion): Promise<boolean> => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    try {
        const pageVersionService = new PageVersionService(adminUrl.value);
        startLoadingThis();
        await pageVersionService.deleteVersion(pageVersion)
        return true
    } catch (err) {
        console.error(err);
        return false
    } finally {
        stopLoadingThis();
    }
};

export const handleDeletePageClick = async (pagemeta: Pagemeta): Promise<boolean> => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    try {
        const publishingService = new PublishingService(adminUrl.value);
        startLoadingThis();
        
        if(pagemeta.isPublished) await publishingService.unpublishPage(pagemeta.path, lang.value)
        return true
    } catch (err) {
        console.error(err);
        return false
    } finally {
        stopLoadingThis();
    }
};

export const handlePublishUnpublishPageClick = async (path: string, versionTag: string, newStatus: boolean): Promise<boolean> => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    try {
        const publishingService = new PublishingService(adminUrl.value);
        startLoadingThis();
        if(newStatus) {
            await publishingService.publishPage(path, versionTag, lang.value);
        } else {
            await publishingService.unpublishPage(path, lang.value);
        }
        return true
    } catch (err) {
        console.error(err);
        return false
    } finally {
        stopLoadingThis();
    }
};

export const handleRegeneratePage = async (pagemeta: Pagemeta) => {
    const publishingService = new PublishingService(adminUrl.value);
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis();
    await publishingService.publishPage(pagemeta.path, pagemeta.versionTag, lang.value);
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