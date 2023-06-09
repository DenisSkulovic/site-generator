import fetchProducts from '@/api/fetchProducts';
import { ProductService } from "@/service";
import useLoading from "@/composables/useLoading";
import adminUrl from "@/state/adminUrl";

jest.mock("@/composables/useLoading");

describe("fetchProducts", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should start and stop loading correctly when API call succeeds", async () => {
        const startLoadingThis = jest.fn();
        const stopLoadingThis = jest.fn();

        useLoading.mockReturnValue({
            startLoadingThis,
            stopLoadingThis,
        });

        const productServiceSpy = jest.spyOn(ProductService.prototype, "getProductAll").mockReturnValue(Promise.resolve({ data: "foo" }));

        await fetchProducts();

        expect(startLoadingThis).toHaveBeenCalledTimes(1);
        expect(ProductService).toHaveBeenCalledTimes(1);
        expect(ProductService).toHaveBeenCalledWith(adminUrl.value);
        expect(productServiceSpy).toHaveBeenCalledTimes(1);
        expect(stopLoadingThis).toHaveBeenCalledTimes(1);

        productServiceSpy.mockRestore();
    });

    it("should start and stop loading correctly when API call fails", async () => {
        const startLoadingThis = jest.fn();
        const stopLoadingThis = jest.fn();

        useLoading.mockReturnValue({
            startLoadingThis,
            stopLoadingThis,
        });

        const productServiceSpy = jest.spyOn(ProductService.prototype, "getProductAll").mockImplementation(() => {
            throw new Error("Error");
        });

        // Silence console.error output to keep test output clean
        jest.spyOn(console, "error").mockImplementation(() => { });

        await fetchProducts();

        expect(startLoadingThis).toHaveBeenCalledTimes(1);
        expect(ProductService).toHaveBeenCalledTimes(1);
        expect(ProductService).toHaveBeenCalledWith(adminUrl.value);
        expect(productServiceSpy).toHaveBeenCalledTimes(1);
        expect(stopLoadingThis).toHaveBeenCalledTimes(1);

        productServiceSpy.mockRestore();
    });
});
