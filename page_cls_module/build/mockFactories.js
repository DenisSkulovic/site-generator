"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScriptAsset = exports.createLinkAsset = exports.createAsset = exports.createHeaderConfigMetadata = exports.createFooterConfigMetadata = exports.createHeaderHTMLMetadata = exports.createFooterHTMLMetadata = exports.createPageHTMLMetadata = exports.createBlockHTMLMetadata = exports.createAreaHTMLMetadata = exports.createBlockConfigMetadata = exports.createAreaConfigMetadata = exports.createPageContentMetadata = exports.createPageConfigMetadata = exports.createFooterContentMetadata = exports.createHeaderContentMetadata = exports.createBlockContentMetadata = exports.createAreaContentMetadata = exports.createBlockContent_TEXT = exports.createBlockContent_IMAGE = exports.createBlockContent_HTML = exports.createGenerateHeaderResponse = exports.createGenerateFooterResponse = exports.createHeaderHTMLObject = exports.createFooterHTMLObject = exports.createGenerateHeaderRequest = exports.createGenerateFooterRequest = exports.createFooterConfig = exports.createFooterContent = exports.createHeaderConfig = exports.createHeaderContent = exports.createNavItem = exports.createMetadata = exports.createProduct = exports.createBlockHTMLObject = exports.createAreaHTMLObject = exports.createPageHTMLObject = exports.createGeneratePageResponse = exports.createGeneratePageRequest = exports.createGenerateBlockResponse = exports.createGenerateBlockRequest = exports.createGenerateAreaResponse = exports.createGenerateAreaRequest = exports.createBlockContent = exports.createAreaContent = exports.createBlockConfig = exports.createAreaConfig = exports.createPageContent = exports.createPageConfig = void 0;
const DTO = __importStar(require("."));
const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
function createPageConfig(params) {
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
exports.createPageConfig = createPageConfig;
function createPageContent(params) {
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
exports.createPageContent = createPageContent;
function createAreaConfig(params) {
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
exports.createAreaConfig = createAreaConfig;
function createBlockConfig(params) {
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
exports.createBlockConfig = createBlockConfig;
function createAreaContent(params) {
    const defaultContent = {
        uuid: guid(),
        data: {},
        metadata: createAreaContentMetadata({}),
        clazz: 'AreaContent'
    };
    return { ...defaultContent, ...params };
}
exports.createAreaContent = createAreaContent;
function createBlockContent(params) {
    const defaultContent = {
        uuid: guid(),
        data: {},
        metadata: createBlockContentMetadata({}),
        clazz: 'BlockContent'
    };
    return { ...defaultContent, ...params };
}
exports.createBlockContent = createBlockContent;
function createGenerateAreaRequest(params) {
    const defaultRequest = {
        content: createAreaContent({}),
        config: createAreaConfig({}),
        clazz: "GenerateAreaRequest"
    };
    return { ...defaultRequest, ...params };
}
exports.createGenerateAreaRequest = createGenerateAreaRequest;
function createGenerateAreaResponse(params) {
    const defaultResponse = {
        data: createAreaHTMLObject({}),
        clazz: "GenerateAreaResponse"
    };
    return { ...defaultResponse, ...params };
}
exports.createGenerateAreaResponse = createGenerateAreaResponse;
function createGenerateBlockRequest(params) {
    const defaultRequest = {
        content: createBlockContent({}),
        config: createBlockConfig({}),
        clazz: "GenerateBlockRequest"
    };
    return { ...defaultRequest, ...params };
}
exports.createGenerateBlockRequest = createGenerateBlockRequest;
function createGenerateBlockResponse(params) {
    const defaultResponse = {
        data: createBlockHTMLObject({}),
        clazz: "GenerateBlockResponse"
    };
    return { ...defaultResponse, ...params };
}
exports.createGenerateBlockResponse = createGenerateBlockResponse;
function createGeneratePageRequest(params) {
    const defaultRequest = {
        content: createPageContent({}),
        config: createPageConfig({}),
        clazz: "GeneratePageRequest"
    };
    return { ...defaultRequest, ...params };
}
exports.createGeneratePageRequest = createGeneratePageRequest;
function createGeneratePageResponse(params) {
    const defaultResponse = {
        data: createPageHTMLObject({}),
        clazz: "GeneratePageResponse"
    };
    return { ...defaultResponse, ...params };
}
exports.createGeneratePageResponse = createGeneratePageResponse;
function createPageHTMLObject(params) {
    const defaultObject = {
        uuid: '',
        html: '',
        metadata: createPageHTMLMetadata({}),
        clazz: "PageHTMLObject"
    };
    return { ...defaultObject, ...params };
}
exports.createPageHTMLObject = createPageHTMLObject;
function createAreaHTMLObject(params) {
    const defaultObject = {
        uuid: '',
        html: '',
        metadata: createAreaHTMLMetadata({}),
        clazz: "AreaHTMLObject"
    };
    return { ...defaultObject, ...params };
}
exports.createAreaHTMLObject = createAreaHTMLObject;
function createBlockHTMLObject(params) {
    const defaultObject = {
        uuid: '',
        html: '',
        metadata: createBlockHTMLMetadata({}),
        clazz: "BlockHTMLObject"
    };
    return { ...defaultObject, ...params };
}
exports.createBlockHTMLObject = createBlockHTMLObject;
function createProduct(params) {
    const defaultProduct = {
        uuid: "",
        clazz: 'Product',
    };
    return { ...defaultProduct, ...params };
}
exports.createProduct = createProduct;
function createMetadata(params) {
    const defaultMetadata = {
        createdTimestamp: Date.now(),
        updatedTimestamp: Date.now(),
        clazz: 'Metadata'
    };
    return { ...defaultMetadata, ...params };
}
exports.createMetadata = createMetadata;
const createNavItem = ({ label = "Test", url = "https://test.com", }) => new DTO.NavItem(label, url);
exports.createNavItem = createNavItem;
const createHeaderContent = ({ uuid = "123", logoUrl = "https://logo.com", logoAlt = "logo", navItems = [(0, exports.createNavItem)({})], metadata = createHeaderContentMetadata({}) }) => new DTO.HeaderContent(uuid, logoUrl, logoAlt, navItems, metadata);
exports.createHeaderContent = createHeaderContent;
const createHeaderConfig = ({ uuid = "123", templateVersion = DTO.HeaderTemplateVersionEnum.TEST_VERSION, bootstrapVersion = DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2, isIncludeNavbar = true, metadata = createHeaderConfigMetadata({}) }) => new DTO.HeaderConfig(uuid, templateVersion, bootstrapVersion, isIncludeNavbar, metadata);
exports.createHeaderConfig = createHeaderConfig;
const createFooterContent = ({ uuid = "123", email = "email", metadata = createFooterContentMetadata({}) }) => new DTO.FooterContent(uuid, email, metadata);
exports.createFooterContent = createFooterContent;
const createFooterConfig = ({ uuid = "123", templateVersion = DTO.FooterTemplateVersionEnum.TEST_VERSION, bootstrapVersion = DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2, metadata = createFooterConfigMetadata({}) }) => new DTO.FooterConfig(uuid, templateVersion, bootstrapVersion, metadata);
exports.createFooterConfig = createFooterConfig;
const createGenerateFooterRequest = ({ content = (0, exports.createFooterContent)({}), config = (0, exports.createFooterConfig)({}) }) => new DTO.GenerateFooterRequest(content, config);
exports.createGenerateFooterRequest = createGenerateFooterRequest;
const createGenerateHeaderRequest = ({ content = (0, exports.createHeaderContent)({}), config = (0, exports.createHeaderConfig)({}) }) => new DTO.GenerateHeaderRequest(content, config);
exports.createGenerateHeaderRequest = createGenerateHeaderRequest;
const createFooterHTMLObject = ({ uuid = "123", html = "<div>Footer</div>", metadata = createFooterHTMLMetadata({}) }) => new DTO.FooterHTMLObject(uuid, html, metadata);
exports.createFooterHTMLObject = createFooterHTMLObject;
const createHeaderHTMLObject = ({ uuid = "123", html = "<div>Header</div>", metadata = createHeaderHTMLMetadata({}) }) => new DTO.HeaderHTMLObject(uuid, html, metadata);
exports.createHeaderHTMLObject = createHeaderHTMLObject;
const createGenerateFooterResponse = ({ data = (0, exports.createFooterHTMLObject)({}) }) => new DTO.GenerateFooterResponse(data);
exports.createGenerateFooterResponse = createGenerateFooterResponse;
const createGenerateHeaderResponse = ({ data = (0, exports.createHeaderHTMLObject)({}) }) => new DTO.GenerateHeaderResponse(data);
exports.createGenerateHeaderResponse = createGenerateHeaderResponse;
function createBlockContent_HTML({ uuid = 'test-html-uuid', data = { html: "<p>Test HTML content</p>" }, metadata = createBlockContentMetadata({}), }) {
    return new DTO.BlockContent_HTML(uuid, data, metadata);
}
exports.createBlockContent_HTML = createBlockContent_HTML;
function createBlockContent_IMAGE({ uuid = 'test-image-uuid', data = {
    imgSrc: "http://example.com/test.jpg",
    imgAlt: "Test alt text",
}, metadata = createBlockContentMetadata({}) }) {
    return new DTO.BlockContent_IMAGE(uuid, data, metadata);
}
exports.createBlockContent_IMAGE = createBlockContent_IMAGE;
function createBlockContent_TEXT({ uuid = 'test-text-uuid', data = { text: "Test text content" }, metadata = createBlockContentMetadata({}), }) {
    return new DTO.BlockContent_TEXT(uuid, data, metadata);
}
exports.createBlockContent_TEXT = createBlockContent_TEXT;
function createAreaContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaContentMetadata"
    };
    return { ...defaultObject, ...params };
}
exports.createAreaContentMetadata = createAreaContentMetadata;
function createBlockContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockContentMetadata"
    };
    return { ...defaultObject, ...params };
}
exports.createBlockContentMetadata = createBlockContentMetadata;
function createHeaderContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderContentMetadata"
    };
    return { ...defaultObject, ...params };
}
exports.createHeaderContentMetadata = createHeaderContentMetadata;
function createFooterContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterContentMetadata"
    };
    return { ...defaultObject, ...params };
}
exports.createFooterContentMetadata = createFooterContentMetadata;
function createPageConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createPageConfigMetadata = createPageConfigMetadata;
function createPageContentMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageContentMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createPageContentMetadata = createPageContentMetadata;
function createAreaConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createAreaConfigMetadata = createAreaConfigMetadata;
function createBlockConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createBlockConfigMetadata = createBlockConfigMetadata;
function createAreaHTMLMetadata(params) {
    const defaultObject = {
        contentUUID: "abc",
        configUUID: "bcd",
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createAreaHTMLMetadata = createAreaHTMLMetadata;
function createBlockHTMLMetadata(params) {
    const defaultObject = {
        contentUUID: "abc",
        configUUID: "bcd",
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createBlockHTMLMetadata = createBlockHTMLMetadata;
function createPageHTMLMetadata(params) {
    const defaultObject = {
        contentUUID: "abc",
        configUUID: "bcd",
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createPageHTMLMetadata = createPageHTMLMetadata;
function createFooterHTMLMetadata(params) {
    const defaultObject = {
        contentUUID: "abc",
        configUUID: "bcd",
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createFooterHTMLMetadata = createFooterHTMLMetadata;
function createHeaderHTMLMetadata(params) {
    const defaultObject = {
        contentUUID: "abc",
        configUUID: "bcd",
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createHeaderHTMLMetadata = createHeaderHTMLMetadata;
function createFooterConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createFooterConfigMetadata = createFooterConfigMetadata;
function createHeaderConfigMetadata(params) {
    const defaultObject = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderConfigMetadata",
    };
    return { ...defaultObject, ...params };
}
exports.createHeaderConfigMetadata = createHeaderConfigMetadata;
function createAsset(params) {
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
exports.createAsset = createAsset;
function createLinkAsset(params) {
    const defaultLinkAsset = {
        ...createAsset({ tag: DTO.AssetTagEnum.LINK, ...params }),
        href: "",
        rel: DTO.AssetRelEnum.STYLESHEET,
        clazz: "LinkAsset"
    };
    return { ...defaultLinkAsset, ...params };
}
exports.createLinkAsset = createLinkAsset;
function createScriptAsset(params) {
    const defaultScriptAsset = {
        ...createAsset({ tag: DTO.AssetTagEnum.SCRIPT, ...params }),
        isAsync: false,
        isDefer: false,
        type: DTO.AssetTypeEnum.JS,
        clazz: "ScriptAsset"
    };
    return { ...defaultScriptAsset, ...params };
}
exports.createScriptAsset = createScriptAsset;
//# sourceMappingURL=mockFactories.js.map