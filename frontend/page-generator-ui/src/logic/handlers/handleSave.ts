import useLoading from "@/composables/useLoading";
import { editPageConfig } from "@/state/pageConfigState";
import { editPageContent } from "@/state/pageContentState";
import { pageConfigService, pageContentService } from "@/computed/services";

const handleSave = async () => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    startLoadingThis();

    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined");
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined");

    // Assuming editPageConfig.value and editPageContent.value contains uuid property
    await pageConfigService.value.putConfig(editPageConfig.value);
    await pageContentService.value.putContent(editPageContent.value);

    pageContentService.value.setPageContent(editPageContent.value)
    pageConfigService.value.setPageConfig(editPageConfig.value)

    stopLoadingThis();
};

export default handleSave;
