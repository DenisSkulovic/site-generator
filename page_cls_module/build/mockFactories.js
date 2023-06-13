import * as DTO from ".";
const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
export function createPageConfig(params) {
    // Here we provide the default values for a PageConfig
    const defaultConfig = {
        uuid: '',
        lang: DTO.LangEnum.EN,
        pageName: '',
        pagePath: '',
        contentId: '',
        isIncludeBootstrap: false,
        headVersion: DTO.HeadVersionEnum.TEST_VERSION,
        bootstrapVersion: DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2,
        templateVersion: DTO.SkeletonVersionEnum.TEST_VERSION,
        areaConfigArr: [],
        assets: [],
        metadata: createPageConfigMetadata({}),
        clazz: "PageConfig"
    };
    // Merge the provided parameters with the default config
    return { ...defaultConfig, ...params };
}
export function createPageContent(params) {
    // Here we provide the default values for a PageContent
    const defaultContent = {
        uuid: '',
        data: {},
        metadata: createPageContentMetadata({}),
        clazz: "PageContent"
    };
    // Merge the provided parameters with the default config
    return { ...defaultContent, ...params };
}
export function createAreaConfig(params) {
    const defaultConfig = {
        uuid: guid(),
        areaName: '',
        isIncludeContainer: false,
        areaTemplateName: DTO.AreaLayoutEnum.LAYOUT_NONE,
        bootstrapVersion: DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2,
        justify: '',
        align: '',
        childConfigArr: [],
        metadata: createAreaConfigMetadata({}),
        clazz: 'AreaConfig'
    };
    return { ...defaultConfig, ...params };
}
export function createBlockConfig(params) {
    const defaultConfig = {
        uuid: guid(),
        blockName: '',
        bootstrapVersion: DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2,
        blockTemplateName: DTO.BlockTemplateEnum.IMAGE,
        metadata: createBlockConfigMetadata({}),
        clazz: 'BlockConfig'
    };
    return { ...defaultConfig, ...params };
}
export function createAreaContent(params) {
    const defaultContent = {
        uuid: guid(),
        data: {},
        metadata: createAreaContentMetadata({}),
        clazz: 'AreaContent'
    };
    return { ...defaultContent, ...params };
}
export function createBlockContent(params) {
    const defaultContent = {
        uuid: guid(),
        data: {},
        metadata: createBlockContentMetadata({}),
        clazz: 'BlockContent'
    };
    return { ...defaultContent, ...params };
}
export function createGenerateAreaRequest(params) {
    const defaultRequest = {
        content: createAreaContent({}),
        config: createAreaConfig({}),
        clazz: "GenerateAreaRequest"
    };
    return { ...defaultRequest, ...params };
}
export function createGenerateAreaResponse(params) {
    const defaultResponse = {
        data: createAreaHTMLObject({}),
        clazz: "GenerateAreaResponse"
    };
    return { ...defaultResponse, ...params };
}
export function createGenerateBlockRequest(params) {
    const defaultRequest = {
        content: createBlockContent({}),
        config: createBlockConfig({}),
        clazz: "GenerateBlockRequest"
    };
    return { ...defaultRequest, ...params };
}
export function createGenerateBlockResponse(params) {
    const defaultResponse = {
        data: createBlockHTMLObject({}),
        clazz: "GenerateBlockResponse"
    };
    return { ...defaultResponse, ...params };
}
export function createGeneratePageRequest(params) {
    const defaultRequest = {
        content: createPageContent({}),
        config: createPageConfig({}),
        clazz: "GeneratePageRequest"
    };
    return { ...defaultRequest, ...params };
}
export function createGeneratePageResponse(params) {
    const defaultResponse = {
        data: createPageHTMLObject({}),
        clazz: "GeneratePageResponse"
    };
    return { ...defaultResponse, ...params };
}
export function createPageHTMLObject(params) {
    const defaultObject = {
        uuid: '',
        html: '',
        config: createPageConfig({}),
        content: createPageContent({}),
        metadata: createPageHTMLMetadata({}),
        clazz: "PageHTMLObject"
    };
    return { ...defaultObject, ...params };
}
export function createAreaHTMLObject(params) {
    const defaultObject = {
        uuid: '',
        html: '',
        config: createAreaConfig({}),
        content: createAreaContent({}),
        metadata: createAreaHTMLMetadata({}),
        clazz: "AreaHTMLObject"
    };
    return { ...defaultObject, ...params };
}
export function createBlockHTMLObject(params) {
    const defaultObject = {
        uuid: '',
        html: '',
        config: createBlockConfig({}),
        content: createBlockContent({}),
        metadata: createBlockHTMLMetadata({}),
        clazz: "BlockHTMLObject"
    };
    return { ...defaultObject, ...params };
}
export function createProduct(params) {
    const defaultProduct = {
        uuid: "",
        clazz: 'Product',
    };
    return { ...defaultProduct, ...params };
}
export function createMetadata(params) {
    const defaultMetadata = {
        createdTimestamp: Date.now(),
        updatedTimestamp: Date.now(),
        clazz: 'Metadata'
    };
    return { ...defaultMetadata, ...params };
}
export const createNavItem = ({ label = "Test", url = "https://test.com", }) => new DTO.NavItem(label, url);
export const createHeaderContent = ({ uuid = "123", logoUrl = "https://logo.com", logoAlt = "logo", navItems = [createNavItem({})], metadata = createHeaderContentMetadata({}) }) => new DTO.HeaderContent(uuid, logoUrl, logoAlt, navItems, metadata);
export const createHeaderConfig = ({ uuid = "123", templateVersion = DTO.HeaderTemplateVersionEnum.TEST_VERSION, bootstrapVersion = DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2, isIncludeNavbar = true, metadata = createHeaderConfigMetadata({}) }) => new DTO.HeaderConfig(uuid, templateVersion, bootstrapVersion, isIncludeNavbar, metadata);
export const createFooterContent = ({ uuid = "123", email = "email", metadata = createFooterContentMetadata({}) }) => new DTO.FooterContent(uuid, email, metadata);
export const createFooterConfig = ({ uuid = "123", templateVersion = DTO.FooterTemplateVersionEnum.TEST_VERSION, bootstrapVersion = DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2, metadata = createFooterConfigMetadata({}) }) => new DTO.FooterConfig(uuid, templateVersion, bootstrapVersion, metadata);
export const createGenerateFooterRequest = ({ content = createFooterContent({}), config = createFooterConfig({}) }) => new DTO.GenerateFooterRequest(content, config);
export const createGenerateHeaderRequest = ({ content = createHeaderContent({}), config = createHeaderConfig({}) }) => new DTO.GenerateHeaderRequest(content, config);
export const createFooterHTMLObject = ({ uuid = "123", html = "<div>Footer</div>", content = createFooterContent({}), config = createFooterConfig({}), metadata = createFooterHTMLMetadata({}) }) => new DTO.FooterHTMLObject(uuid, html, content, config, metadata);
export const createHeaderHTMLObject = ({ uuid = "123", html = "<div>Header</div>", config = createHeaderConfig({}), content = createHeaderContent({}), metadata = createHeaderHTMLMetadata({}) }) => new DTO.HeaderHTMLObject(uuid, html, config, content, metadata);
export const createGenerateFooterResponse = ({ data = createFooterHTMLObject({}) }) => new DTO.GenerateFooterResponse(data);
export const createGenerateHeaderResponse = ({ data = createHeaderHTMLObject({}) }) => new DTO.GenerateHeaderResponse(data);
export function createBlockContent_HTML({ uuid = 'test-html-uuid', data = { html: "<p>Test HTML content</p>" }, metadata = createBlockContentMetadata({}), }) {
    return new DTO.BlockContent_HTML(uuid, data, metadata);
}
export function createBlockContent_IMAGE({ uuid = 'test-image-uuid', data = {
    imgSrc: "http://example.com/test.jpg",
    imgAlt: "Test alt text",
}, metadata = createBlockContentMetadata({}) }) {
    return new DTO.BlockContent_IMAGE(uuid, data, metadata);
}
export function createBlockContent_TEXT({ uuid = 'test-text-uuid', data = { text: "Test text content" }, metadata = createBlockContentMetadata({}), }) {
    return new DTO.BlockContent_TEXT(uuid, data, metadata);
}
export function createAreaContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaContentMetadata"
    };
    return { ...defaultObject, ...params };
}
export function createBlockContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockContentMetadata"
    };
    return { ...defaultObject, ...params };
}
export function createHeaderContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderContentMetadata"
    };
    return { ...defaultObject, ...params };
}
export function createFooterContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterContentMetadata"
    };
    return { ...defaultObject, ...params };
}
export function createPageConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createPageContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageContentMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createAreaConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createBlockConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createAreaHTMLMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createBlockHTMLMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createPageHTMLMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createFooterHTMLMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createHeaderHTMLMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createFooterConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createHeaderConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
export function createAsset(params) {
    const defaultAsset = {
        uuid: '',
        name: '',
        path: '',
        s3Path: '',
        s3Link: '',
        tag: DTO.AssetTagEnum.SCRIPT,
        position: DTO.AssetPositionEnum.BODY_END,
        clazz: "Asset"
    };
    return { ...defaultAsset, ...params };
}
export function createLinkAsset(params) {
    const defaultLinkAsset = {
        ...createAsset({ tag: DTO.AssetTagEnum.LINK, ...params }),
        rel: DTO.AssetRelEnum.STYLESHEET,
        clazz: "LinkAsset"
    };
    return { ...defaultLinkAsset, ...params };
}
export function createScriptAsset(params) {
    const defaultScriptAsset = {
        ...createAsset({ tag: DTO.AssetTagEnum.SCRIPT, ...params }),
        isAsync: false,
        isDefer: false,
        type: DTO.AssetTypeEnum.JS,
        clazz: "ScriptAsset"
    };
    return { ...defaultScriptAsset, ...params };
}
export function createStyleAsset(params) {
    const defaultStyleAsset = {
        ...createAsset({ tag: DTO.AssetTagEnum.STYLE, ...params }),
        type: DTO.AssetTypeEnum.CSS,
        clazz: "StyleAsset"
    };
    return { ...defaultStyleAsset, ...params };
}
//# sourceMappingURL=mockFactories.js.map