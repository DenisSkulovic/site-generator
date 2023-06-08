import useLoading from "@/composables/useLoading";
import { ProductService } from "@/service";
import adminUrl from "@/state/adminUrl";

const fetchProducts = async () => {
    const { startLoadingThis, stopLoadingThis, isLoadingThis } = useLoading();
    try {
        startLoadingThis();
        const productService = new ProductService(adminUrl.value);
        await productService.getProductAll();
    } catch (err) {
        console.error(err);
        // Show error to the user
    } finally {
        stopLoadingThis();
    }
};

export default fetchProducts