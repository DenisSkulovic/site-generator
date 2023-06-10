import { routes, PagePathEnum, PageNameEnum } from "@/router";
import HomeView from "@/views/HomeView.vue";
import { shallowMount } from "@vue/test-utils";

jest.mock("@/views/PagesList.vue", () => ({
    name: "PagesList",
}));
jest.mock("@/views/PageDetail.vue", () => ({
    name: "PageDetail",
}));
jest.mock("@/views/HeaderFooterManager.vue", () => ({
    name: "HeaderFooterManager",
}));

describe("Router", () => {
    it("should have the correct routes", () => {
        const expectedRoutes = [
            { path: PagePathEnum.HOME, name: PageNameEnum.HOME, component: HomeView },
            { path: PagePathEnum.PAGES, name: PageNameEnum.PAGES, component: jest.fn() },
            { path: PagePathEnum.PAGE, name: PageNameEnum.PAGE, component: jest.fn() },
            { path: PagePathEnum.HEADER_FOOTER_MANAGER, name: PageNameEnum.HEADER_FOOTER_MANAGER, component: jest.fn() },
        ];

        expect(routes).toHaveLength(expectedRoutes.length);
        for (let i = 0; i < routes.length; i++) {
            expect(routes[i].path).toEqual(expectedRoutes[i].path);
            expect(routes[i].name).toEqual(expectedRoutes[i].name);
            // for the dynamically imported components, we can just check whether it's a function
            expect(typeof routes[i].component).toEqual('function');
        }
    });
});
