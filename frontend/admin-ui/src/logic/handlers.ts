import { FooterService } from "@/service/FooterService"
import { HeaderService } from "@/service/HeaderService"
import adminUrl from "@/state/adminUrl"
import getEnvVariable from "./getEnvVariable";
import useLoading from "@/composables/useLoading";
import { pagemetasMapEdit } from "@/computed/pagemetas";
import { PagemetaService } from "@/service";
import type { Pagemeta } from "@admin_cls_module";


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
    const liveEditorUrl = getEnvVariable("VITE_APP_LIVE_EDITOR_URL")
    window.open(liveEditorUrl)
};

export const handleOpenPageInEditor = (pageId: string) => {
    // Implement logic to open the page in the editor
};

export const handleDeletePageClick = async (pageId: string) => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    let res
    if (window.confirm("Are you sure you want to delete this page?")) {
        try {
            const pagemetaService = new PagemetaService(adminUrl.value);
            const pagemeta: Pagemeta | undefined = pagemetasMapEdit.value.get(pageId)
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