"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const RenderData_Page_1 = require("@/classes/renderData/pages/RenderData_Page");
const constructPage_1 = require("../constructPage");
const _page_cls_module_1 = require("@page_cls_module");
const mockFactories_1 = require("@/test/mockFactories");
const mockFactories_2 = require("../../../../../../../page_cls_module/src/mockFactories");
describe("buildPageHTMLObject", () => {
    test("Should return a PageHTMLObject instance", () => {
        const uuid = 'test-uuid';
        const pageHtml = '<div>Test Page</div>';
        const pageConfig = (0, mockFactories_2.createPageConfig)({}); // Instantiate with valid data
        const pageContent = (0, mockFactories_2.createPageContent)({}); // Instantiate with valid data
        const pageMetadata = new _page_cls_module_1.PageHTMLMetadata(Date.now(), Date.now());
        const result = (0, constructPage_1.buildPageHTMLObject)(uuid, pageHtml, pageConfig, pageContent, pageMetadata);
        expect(result).toBeInstanceOf(_page_cls_module_1.PageHTMLObject);
    });
    test("Should throw an error when parameters are not valid", () => {
        const uuid = null;
        const pageHtml = null;
        const pageConfig = null;
        const pageContent = null;
        const pageMetadata = null;
        expect(() => (0, constructPage_1.buildPageHTMLObject)(uuid, pageHtml, pageConfig, pageContent, pageMetadata)).toThrow();
    });
});
describe("buildPageHTMLMetadata", () => {
    test("Should return a PageHTMLMetadata instance", () => {
        const createdTimestamp = Date.now();
        const updatedTimestamp = Date.now();
        const result = (0, constructPage_1.buildPageHTMLMetadata)(createdTimestamp, updatedTimestamp);
        expect(result).toBeInstanceOf(_page_cls_module_1.PageHTMLMetadata);
    });
    test("Should throw an error when parameters are not valid", () => {
        const createdTimestamp = null;
        const updatedTimestamp = null;
        expect(() => (0, mockFactories_2.createMetadata)({ createdTimestamp, updatedTimestamp })).toThrow();
    });
});
describe("renderEjsFile", () => {
    test("Should return the correct HTML string", async () => {
        const skeletonTemplatePath = '/valid/path/to/ejs/template'; // TODO
        const pageRenderData = (0, mockFactories_1.createRenderDataPage)({}); // Instantiate with valid data
        const result = await (0, constructPage_1.renderEjsFile)(skeletonTemplatePath, pageRenderData);
        expect(typeof result).toBe('string');
    });
    test("Should throw an error when skeleton template path does not exist", async () => {
        const skeletonTemplatePath = '/invalid/path/to/ejs/template';
        const pageRenderData = (0, mockFactories_1.createRenderDataPage)({}); // Instantiate with valid data
        await expect((0, constructPage_1.renderEjsFile)(skeletonTemplatePath, pageRenderData)).rejects.toThrow();
    });
});
describe("buildPageRenderData", () => {
    test("Should return a RenderData_Page instance", () => {
        const pageConfig = (0, mockFactories_2.createPageConfig)({}); // Instantiate with valid data
        const pageContent = (0, mockFactories_2.createPageContent)({}); // Instantiate with valid data
        const headerHTMLObject = (0, mockFactories_2.createHeaderHTMLObject)({}); // Instantiate with valid data
        const areaHTMLObjectsArr = [(0, mockFactories_2.createAreaHTMLObject)({}), (0, mockFactories_2.createAreaHTMLObject)({})]; // Instantiate with valid data
        const footerHTMLObject = (0, mockFactories_2.createFooterHTMLObject)({}); // Instantiate with valid data
        const result = (0, constructPage_1.buildPageRenderData)(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject);
        expect(result).toBeInstanceOf(RenderData_Page_1.RenderData_Page);
    });
    test("Should throw an error when parameters are not valid", () => {
        const pageConfig = null;
        const pageContent = null;
        const headerHTMLObject = null;
        const areaHTMLObjectsArr = null;
        const footerHTMLObject = null;
        expect(() => (0, constructPage_1.buildPageRenderData)(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject)).toThrow();
    });
});
describe("getSkeletonTemplatePath", () => {
    test("Should return the correct skeleton template path", () => {
        const __dirname = '/valid/dirname'; // TODO
        const bootstrapVersion = _page_cls_module_1.BootstrapVersionEnum.BOOTSTRAP_5_0_2; // Valid bootstrap version
        const templateVersion = _page_cls_module_1.SkeletonVersionEnum.TEST_VERSION; // Valid template version
        const result = (0, constructPage_1.getSkeletonTemplatePath)(__dirname, bootstrapVersion, templateVersion);
        expect(result).toBe(`${__dirname}/templates/html/${bootstrapVersion}/skeleton/${templateVersion}/index.ejs`);
    });
    test("Should throw an error when parameters are not valid", () => {
        const __dirname = null;
        const bootstrapVersion = null;
        const templateVersion = null;
        expect(() => (0, constructPage_1.getSkeletonTemplatePath)(__dirname, bootstrapVersion, templateVersion)).toThrow();
    });
});
describe("constructPage", () => {
    const mockConstructArea = jest.fn((areaConfig, areaContent) => Promise.resolve((0, mockFactories_2.createAreaHTMLObject)({})));
    const mockGuidFn = jest.fn(() => '12345678');
    test("Should return a PageHTMLObject instance", async () => {
        const pageConfig = (0, mockFactories_2.createPageConfig)({}); // Instantiate with valid data
        const pageContent = (0, mockFactories_2.createPageContent)({}); // Instantiate with valid data
        const headerHTMLObject = (0, mockFactories_2.createHeaderHTMLObject)({}); // Instantiate with valid data
        const footerHTMLObject = (0, mockFactories_2.createFooterHTMLObject)({}); // Instantiate with valid data
        const __dirname = '/valid/dirname'; // TODO
        const result = await (0, constructPage_1.constructPage)(pageContent, pageConfig, headerHTMLObject, footerHTMLObject, __dirname, mockConstructArea, mockGuidFn);
        expect(result).toBeInstanceOf(_page_cls_module_1.PageHTMLObject);
    });
    test("Should throw an error when pageContent or pageConfig are not valid", async () => {
        const __dirname = null;
        const pageConfig = null;
        const pageContent = null;
        const headerHTMLObject = null;
        const footerHTMLObject = null;
        await expect((0, constructPage_1.constructPage)(pageContent, pageConfig, headerHTMLObject, footerHTMLObject, __dirname, mockConstructArea, mockGuidFn)).rejects.toThrow();
    });
    test("Should throw an error when areaContent cannot be found for given areaConfig", async () => {
        const pageConfig = (0, mockFactories_2.createPageConfig)({}); // Instantiate with valid data but does not contain an AreaConfig
        const pageContent = (0, mockFactories_2.createPageContent)({}); // Instantiate with valid data but does not contain an AreaContent
        const headerHTMLObject = (0, mockFactories_2.createHeaderHTMLObject)({}); // Instantiate with valid data
        const footerHTMLObject = (0, mockFactories_2.createFooterHTMLObject)({}); // Instantiate with valid data
        const __dirname = '/valid/dirname'; // TODO
        await expect((0, constructPage_1.constructPage)(pageContent, pageConfig, headerHTMLObject, footerHTMLObject, __dirname, mockConstructArea, mockGuidFn)).rejects.toThrow('areaContent cannot be undefined');
    });
});
//# sourceMappingURL=constructPage.spec.js.map