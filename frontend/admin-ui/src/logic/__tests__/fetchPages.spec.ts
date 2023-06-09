import useLoading from "@/composables/useLoading";
import { PageService } from "@/service";
import adminUrl from "@/state/adminUrl";
import fetchPages from "@/utils/fetchPages";

jest.mock("@/composables/useLoading");
jest.mock("@/service");

describe("fetchPages", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("fetches page HTML objects and stops loading", async () => {
        const startLoadingThisMock = jest.fn();
        const stopLoadingThisMock = jest.fn();
        const getPageHTMLObjectAllMock = jest.fn(() => {
            return [{ title: "Sample Page" }, { title: "Another Page" }]
        });
        useLoading.mockReturnValueOnce({
            startLoadingThis: startLoadingThisMock,
            stopLoadingThis: stopLoadingThisMock
        });
        PageService.mockImplementationOnce(() => {
            return {
                getPageHTMLObjectAll: getPageHTMLObjectAllMock
            };
        });
        adminUrl.value = "http://localhost:3000";
        await fetchPages();
        expect(PageService).toHaveBeenCalledTimes(1);
        expect(PageService).toHaveBeenCalledWith("http://localhost:3000");
        expect(getPageHTMLObjectAllMock).toHaveBeenCalledTimes(1);
        expect(startLoadingThisMock).toHaveBeenCalledTimes(1);
        expect(stopLoadingThisMock).toHaveBeenCalledTimes(1);
    });
});
