import { FooterService } from "@/service/FooterService"
import { HeaderService } from "@/service/HeaderService"
import adminUrl from "@/state/adminUrl"
import env from "@/state/env";
import getLiveEditorUrl from "./getLiveEditorUrl";
import type { PageHTMLObject } from "../../../../page_cls_module/src";
import useLoading from "@/composables/useLoading";
import { pagesMapEdit } from "@/computed/pages";
import { PageService } from "@/service";


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
    const res = await footerService.regenetareFooter()
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

export const handleAddNewPageClick = () => {
    const liveEditorUrl = getLiveEditorUrl(env.value)
    window.open(liveEditorUrl)
};

export const handleOpenPageInEditor = (pageId: string) => {
    // Implement logic to open the page in the editor
};

export const handleDeletePageClick = async (pageId: string) => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    let res
    if (window.confirm("Are you sure you want to delete this page?")) {
        // Implement delete logic here
        try {
            const pageService = new PageService(adminUrl.value);
            const pageHTMLObject: PageHTMLObject | undefined = pagesMapEdit.value.get(pageId)
            if (!pageHTMLObject) throw new Error("pageHTMLObject cannot be undefined")
            startLoadingThis();
            res = await pageService.unpublishPage(pageHTMLObject)
        } catch (err) {
            console.error(err);
            // Show error to the user
        } finally {
            stopLoadingThis();
        }
    }
    return res
};