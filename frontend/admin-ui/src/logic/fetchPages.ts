import useLoading from "@/composables/useLoading";
import { PageService } from "@/service";
import adminUrl from "@/state/adminUrl";

const fetchPages = async () => {
    const { startLoadingThis, stopLoadingThis } = useLoading();
    try {
        startLoadingThis();
        const pageService = new PageService(adminUrl.value);
        pageService.getPageHTMLObjectAll();
    } catch (err) {
        console.error(err);
        // Show error to the user
    } finally {
        stopLoadingThis();
    }
};

export default fetchPages