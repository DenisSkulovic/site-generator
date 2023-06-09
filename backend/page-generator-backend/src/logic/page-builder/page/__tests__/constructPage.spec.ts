import { RenderData_Page } from '@/classes/renderData/pages/RenderData_Page';
import { buildPageHTMLObject, buildPageHTMLMetadata, buildPageRenderData, renderEjsFile, constructPage, getSkeletonTemplatePath } from '../constructPage';
import { AreaConfig, AreaContent, AreaHTMLObject, BootstrapVersionEnum, FooterHTMLObject, HeaderHTMLObject, PageConfig, PageContent, PageHTMLMetadata, PageHTMLObject, SkeletonVersionEnum } from "@page_cls_module"
import { createRenderDataPage } from '@/test/mockFactories';
import { createPageConfig, createPageContent, createMetadata, createHeaderHTMLObject, createAreaHTMLObject, createFooterHTMLObject } from '../../../../../../../page_cls_module/src/mockFactories';

describe("buildPageHTMLObject", () => {
    test("Should return a PageHTMLObject instance", () => {
        const uuid = 'test-uuid';
        const pageHtml = '<div>Test Page</div>';
        const pageConfig = createPageConfig({}); // Instantiate with valid data
        const pageContent = createPageContent({}); // Instantiate with valid data
        const pageMetadata = new PageHTMLMetadata(Date.now(), Date.now());

        const result = buildPageHTMLObject(uuid, pageHtml, pageConfig, pageContent, pageMetadata);
        
        expect(result).toBeInstanceOf(PageHTMLObject);
    });

    test("Should throw an error when parameters are not valid", () => {
        const uuid = null as unknown as string;
        const pageHtml = null as unknown as string;
        const pageConfig = null as unknown as PageConfig;
        const pageContent = null as unknown as PageContent;
        const pageMetadata = null as unknown as PageHTMLMetadata;

        expect(() => buildPageHTMLObject(uuid, pageHtml, pageConfig, pageContent, pageMetadata)).toThrow();
    });
});

describe("buildPageHTMLMetadata", () => {
    test("Should return a PageHTMLMetadata instance", () => {
        const createdTimestamp = Date.now();
        const updatedTimestamp = Date.now();

        const result = buildPageHTMLMetadata(createdTimestamp, updatedTimestamp);

        expect(result).toBeInstanceOf(PageHTMLMetadata);
    });

    test("Should throw an error when parameters are not valid", () => {
        const createdTimestamp = null as unknown as number;
        const updatedTimestamp = null as unknown as number;

        expect(() => createMetadata({createdTimestamp, updatedTimestamp})).toThrow();
    });
});


describe("renderEjsFile", () => {
    test("Should return the correct HTML string", async () => {
        const skeletonTemplatePath = '/valid/path/to/ejs/template'; // TODO
        const pageRenderData = createRenderDataPage({}); // Instantiate with valid data

        const result = await renderEjsFile(skeletonTemplatePath, pageRenderData);

        expect(typeof result).toBe('string');
    });

    test("Should throw an error when skeleton template path does not exist", async () => {
        const skeletonTemplatePath = '/invalid/path/to/ejs/template';
        const pageRenderData = createRenderDataPage({}); // Instantiate with valid data

        await expect(renderEjsFile(skeletonTemplatePath, pageRenderData)).rejects.toThrow();
    });
});

describe("buildPageRenderData", () => {
    test("Should return a RenderData_Page instance", () => {
        const pageConfig = createPageConfig({}); // Instantiate with valid data
        const pageContent = createPageContent({}); // Instantiate with valid data
        const headerHTMLObject = createHeaderHTMLObject({}); // Instantiate with valid data
        const areaHTMLObjectsArr = [createAreaHTMLObject({}), createAreaHTMLObject({})]; // Instantiate with valid data
        const footerHTMLObject = createFooterHTMLObject({}); // Instantiate with valid data

        const result = buildPageRenderData(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject);

        expect(result).toBeInstanceOf(RenderData_Page);
    });

    test("Should throw an error when parameters are not valid", () => {
        const pageConfig = null as unknown as PageConfig;
        const pageContent = null as unknown as PageContent;
        const headerHTMLObject = null as unknown as HeaderHTMLObject;
        const areaHTMLObjectsArr = null as unknown as AreaHTMLObject[];
        const footerHTMLObject = null as unknown as FooterHTMLObject;

        expect(() => buildPageRenderData(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject)).toThrow();
    });
});


describe("getSkeletonTemplatePath", () => {
    test("Should return the correct skeleton template path", () => {
        const __dirname = '/valid/dirname'; // TODO
        const bootstrapVersion = BootstrapVersionEnum.BOOTSTRAP_5_0_2; // Valid bootstrap version
        const templateVersion = SkeletonVersionEnum.TEST_VERSION; // Valid template version

        const result = getSkeletonTemplatePath(__dirname, bootstrapVersion, templateVersion);

        expect(result).toBe(`${__dirname}/templates/html/${bootstrapVersion}/skeleton/${templateVersion}/index.ejs`);
    });

    test("Should throw an error when parameters are not valid", () => {
        const __dirname = null as unknown as string;
        const bootstrapVersion = null as unknown as BootstrapVersionEnum.BOOTSTRAP_5_0_2;
        const templateVersion = null as unknown as SkeletonVersionEnum;

        expect(() => getSkeletonTemplatePath(__dirname, bootstrapVersion, templateVersion)).toThrow();
    });
});

describe("constructPage", () => {
    const mockConstructArea = jest.fn((areaConfig: AreaConfig, areaContent: AreaContent) => Promise.resolve(createAreaHTMLObject({})));
    const mockGuidFn = jest.fn(() => '12345678');

    test("Should return a PageHTMLObject instance", async () => {
        const pageConfig = createPageConfig({}); // Instantiate with valid data
        const pageContent = createPageContent({}); // Instantiate with valid data
        const headerHTMLObject = createHeaderHTMLObject({}); // Instantiate with valid data
        const footerHTMLObject = createFooterHTMLObject({}); // Instantiate with valid data
        const __dirname = '/valid/dirname'; // TODO

        const result = await constructPage(pageContent, pageConfig, headerHTMLObject, footerHTMLObject, __dirname, mockConstructArea, mockGuidFn);

        expect(result).toBeInstanceOf(PageHTMLObject);
    });

    test("Should throw an error when pageContent or pageConfig are not valid", async () => {
        const __dirname = null as unknown as string;
        const pageConfig = null as unknown as PageConfig;
        const pageContent = null as unknown as PageContent;
        const headerHTMLObject = null as unknown as HeaderHTMLObject;
        const footerHTMLObject = null as unknown as FooterHTMLObject;

        await expect(constructPage(pageContent, pageConfig, headerHTMLObject, footerHTMLObject, __dirname, mockConstructArea, mockGuidFn)).rejects.toThrow();
    });

    test("Should throw an error when areaContent cannot be found for given areaConfig", async () => {
        const pageConfig = createPageConfig({}); // Instantiate with valid data but does not contain an AreaConfig
        const pageContent = createPageContent({}); // Instantiate with valid data but does not contain an AreaContent
        const headerHTMLObject = createHeaderHTMLObject({}); // Instantiate with valid data
        const footerHTMLObject = createFooterHTMLObject({}); // Instantiate with valid data
        const __dirname = '/valid/dirname'; // TODO

        await expect(constructPage(pageContent, pageConfig, headerHTMLObject, footerHTMLObject, __dirname, mockConstructArea, mockGuidFn)).rejects.toThrow('areaContent cannot be undefined');
    });
});