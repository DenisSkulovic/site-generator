import useLoading from "@/composables/useLoading";
import { PagemetaService } from "@/service";
import adminUrl from "@/state/adminUrl";
import lang from "@/state/lang";

const fetchPagemetas = async (): Promise<void> => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    try {
        startLoadingThis();
        const pageService = new PagemetaService(adminUrl.value);
        await pageService.getPagemetaAll(lang.value);
    } catch (err) {
        console.error(err);
        // Show error to the user
    } finally {
        stopLoadingThis();
    }
};

export default fetchPagemetas