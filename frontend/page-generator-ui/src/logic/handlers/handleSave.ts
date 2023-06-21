import useLoading from "@/composables/useLoading";
import { editPageConfig } from "@/state/pageConfigState";
import { editPageContent } from "@/state/pageContentState";
import { pageConfigService, pageContentService, pageVersionService } from "@/computed/services";
import pagePath from "@/state/pagePath";

const handleSave = async (tag: string) => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis();

    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined");
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined");

    const newPageConfig = pageConfigService.value.getPageConfigCopy(editPageConfig.value)
    const newPageContent = pageContentService.value.getPageContentCopy(editPageContent.value)
    const newVersion = pageVersionService.value.getNewPageVersion(tag, pagePath.value, newPageConfig.uuid, newPageContent.uuid)

    // Assuming editPageConfig.value and editPageContent.value contains uuid property
    await Promise.all([
        pageConfigService.value.createConfig(newPageConfig),
        pageContentService.value.createContent(newPageContent),
        pageVersionService.value.createPageVersion(newVersion),
    ])

    pageConfigService.value.setPageConfig(newPageConfig)
    pageContentService.value.setPageContent(newPageContent)
    pageVersionService.value.setPageVersion(newVersion)

    stopLoadingThis();
};

export default handleSave;
