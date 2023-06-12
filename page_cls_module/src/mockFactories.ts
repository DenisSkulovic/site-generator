import * as DTO from "."

const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function createPageConfig(params: Partial<DTO.PageConfig>): DTO.PageConfig {
    // Here we provide the default values for a PageConfig
    const defaultConfig: DTO.PageConfig = {
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

export function createPageContent(params: Partial<DTO.PageContent>): DTO.PageContent {
    // Here we provide the default values for a PageContent
    const defaultContent: DTO.PageContent = {
        uuid: '',
        data: {}, // provide the default value for data
        metadata: createPageContentMetadata({}),
        clazz: "PageContent"
    };

    // Merge the provided parameters with the default config
    return { ...defaultContent, ...params };
}

export function createAreaConfig(params: Partial<DTO.AreaConfig>): DTO.AreaConfig {
    const defaultConfig: DTO.AreaConfig = {
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

export function createBlockConfig(params: Partial<DTO.BlockConfig>): DTO.BlockConfig {
    const defaultConfig: DTO.BlockConfig = {
        uuid: guid(),
        blockName: '',
        bootstrapVersion: DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2,
        blockTemplateName: DTO.BlockTemplateEnum.IMAGE,
        metadata: createBlockConfigMetadata({}),
        clazz: 'BlockConfig'
    };

    return { ...defaultConfig, ...params };
}

export function createAreaContent(params: Partial<DTO.AreaContent>): DTO.AreaContent {
    const defaultContent: DTO.AreaContent = {
        uuid: guid(),
        data: {},
        metadata: createAreaContentMetadata({}),
        clazz: 'AreaContent'
    };

    return { ...defaultContent, ...params };
}

export function createBlockContent(params: Partial<DTO.BlockContent>): DTO.BlockContent {
    const defaultContent: DTO.BlockContent = {
        uuid: guid(),
        data: {},
        metadata: createBlockContentMetadata({}),
        clazz: 'BlockContent'
    };

    return { ...defaultContent, ...params };
}


export function createGenerateAreaRequest(params: Partial<DTO.GenerateAreaRequest>): DTO.GenerateAreaRequest {
    const defaultRequest: DTO.GenerateAreaRequest = {
        content: createAreaContent({}),
        config: createAreaConfig({}),
        clazz: "GenerateAreaRequest"
    };
    return { ...defaultRequest, ...params };
}

export function createGenerateAreaResponse(params: Partial<DTO.GenerateAreaResponse>): DTO.GenerateAreaResponse {
    const defaultResponse: DTO.GenerateAreaResponse = {
        data: createAreaHTMLObject({}),
        clazz: "GenerateAreaResponse"
    };
    return { ...defaultResponse, ...params };
}

export function createGenerateBlockRequest(params: Partial<DTO.GenerateBlockRequest>): DTO.GenerateBlockRequest {
    const defaultRequest: DTO.GenerateBlockRequest = {
        content: createBlockContent({}),
        config: createBlockConfig({}),
        clazz: "GenerateBlockRequest"
    };
    return { ...defaultRequest, ...params };
}

export function createGenerateBlockResponse(params: Partial<DTO.GenerateBlockResponse>): DTO.GenerateBlockResponse {
    const defaultResponse: DTO.GenerateBlockResponse = {
        data: createBlockHTMLObject({}),
        clazz: "GenerateBlockResponse"
    };
    return { ...defaultResponse, ...params };
}

export function createGeneratePageRequest(params: Partial<DTO.GeneratePageRequest>): DTO.GeneratePageRequest {
    const defaultRequest: DTO.GeneratePageRequest = {
        content: createPageContent({}),
        config: createPageConfig({}),
        clazz: "GeneratePageRequest"
    };
    return { ...defaultRequest, ...params };
}

export function createGeneratePageResponse(params: Partial<DTO.GeneratePageResponse>): DTO.GeneratePageResponse {
    const defaultResponse: DTO.GeneratePageResponse = {
        data: createPageHTMLObject({}),
        clazz: "GeneratePageResponse"
    };
    return { ...defaultResponse, ...params };
}

export function createPageHTMLObject(params: Partial<DTO.PageHTMLObject>): DTO.PageHTMLObject {
    const defaultObject: DTO.PageHTMLObject = {
        uuid: '',
        html: '',
        config: createPageConfig({}),
        content: createPageContent({}),
        metadata: createPageHTMLMetadata({}),
        clazz: "PageHTMLObject"
    };
    return { ...defaultObject, ...params };
}

export function createAreaHTMLObject(params: Partial<DTO.AreaHTMLObject>): DTO.AreaHTMLObject {
    const defaultObject: DTO.AreaHTMLObject = {
        uuid: '',
        html: '',
        config: createAreaConfig({}),
        content: createAreaContent({}),
        metadata: createAreaHTMLMetadata({}),
        clazz: "AreaHTMLObject"
    };
    return { ...defaultObject, ...params };
}

export function createBlockHTMLObject(params: Partial<DTO.BlockHTMLObject>): DTO.BlockHTMLObject {
    const defaultObject: DTO.BlockHTMLObject = {
        uuid: '',
        html: '',
        config: createBlockConfig({}),
        content: createBlockContent({}),
        metadata: createBlockHTMLMetadata({}),
        clazz: "BlockHTMLObject"
    };
    return { ...defaultObject, ...params };
}

export function createProduct(params: Partial<DTO.Product>): DTO.Product {
    const defaultProduct: DTO.Product = {
        uuid: "",
        clazz: 'Product',
    };

    return { ...defaultProduct, ...params };
}

export function createMetadata(params: Partial<DTO.Metadata>): DTO.Metadata {
    const defaultMetadata: DTO.Metadata = {
        createdTimestamp: Date.now(),
        updatedTimestamp: Date.now(),
        clazz: 'Metadata'
    };

    return { ...defaultMetadata, ...params };
}

export const createNavItem = ({
    label = "Test",
    url = "https://test.com",
}) => new DTO.NavItem(label, url);

export const createHeaderContent = ({
    uuid = "123",
    logoUrl = "https://logo.com",
    logoAlt = "logo",
    navItems = [createNavItem({})],
    metadata = createHeaderContentMetadata({})
}) => new DTO.HeaderContent(uuid, logoUrl, logoAlt, navItems, metadata);

export const createHeaderConfig = ({
    uuid = "123",
    templateVersion = DTO.HeaderTemplateVersionEnum.TEST_VERSION,
    bootstrapVersion = DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2,
    isIncludeNavbar = true,
    metadata = createHeaderConfigMetadata({})
}) => new DTO.HeaderConfig(uuid, templateVersion, bootstrapVersion, isIncludeNavbar, metadata);

export const createFooterContent = ({
    uuid = "123",
    email = "email",
    metadata = createFooterContentMetadata({})
}) => new DTO.FooterContent(uuid, email, metadata);

export const createFooterConfig = ({
    uuid = "123",
    templateVersion = DTO.FooterTemplateVersionEnum.TEST_VERSION,
    bootstrapVersion = DTO.BootstrapVersionEnum.BOOTSTRAP_5_0_2,
    metadata = createFooterConfigMetadata({})
}) => new DTO.FooterConfig(uuid, templateVersion, bootstrapVersion, metadata);

export const createGenerateFooterRequest = ({
    content = createFooterContent({}),
    config = createFooterConfig({})
}) => new DTO.GenerateFooterRequest(content, config);

export const createGenerateHeaderRequest = ({
    content = createHeaderContent({}),
    config = createHeaderConfig({})
}) => new DTO.GenerateHeaderRequest(content, config);

export const createFooterHTMLObject = ({
    uuid = "123",
    html = "<div>Footer</div>",
    content = createFooterContent({}),
    config = createFooterConfig({}),
    metadata = createFooterHTMLMetadata({})
}) => new DTO.FooterHTMLObject(uuid, html, content, config, metadata);

export const createHeaderHTMLObject = ({
    uuid = "123",
    html = "<div>Header</div>",
    config = createHeaderConfig({}),
    content = createHeaderContent({}),
    metadata = createHeaderHTMLMetadata({})
}) => new DTO.HeaderHTMLObject(uuid, html, config, content, metadata);

export const createGenerateFooterResponse = ({
    data = createFooterHTMLObject({})
}) => new DTO.GenerateFooterResponse(data);

export const createGenerateHeaderResponse = ({
    data = createHeaderHTMLObject({})
}) => new DTO.GenerateHeaderResponse(data);

export function createBlockContent_HTML({
    uuid = 'test-html-uuid',
    data = { html: "<p>Test HTML content</p>" },
    metadata = createBlockContentMetadata({}),
}): DTO.BlockContent_HTML {
    return new DTO.BlockContent_HTML(
        uuid,
        data,
        metadata
    );
}

export function createBlockContent_IMAGE({
    uuid = 'test-image-uuid',
    data = {
        imgSrc: "http://example.com/test.jpg",
        imgAlt: "Test alt text",
    },
    metadata = createBlockContentMetadata({})
}): DTO.BlockContent_IMAGE {
    return new DTO.BlockContent_IMAGE(
        uuid,
        data,
        metadata,
    );
}

export function createBlockContent_TEXT({
    uuid = 'test-text-uuid',
    data = { text: "Test text content" },
    metadata = createBlockContentMetadata({}),
}): DTO.BlockContent_TEXT {
    return new DTO.BlockContent_TEXT(
        uuid,
        data,
        metadata,
    );
}

export function createAreaContentMetadata(params: Partial<DTO.AreaContentMetadata>): DTO.AreaContentMetadata {
    const defaultObject: DTO.AreaContentMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaContentMetadata"
    };
    return { ...defaultObject, ...params };
}

export function createBlockContentMetadata(params: Partial<DTO.BlockContentMetadata>): DTO.BlockContentMetadata {
    const defaultObject: DTO.BlockContentMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockContentMetadata"
    };
    return { ...defaultObject, ...params };
}

export function createHeaderContentMetadata(params: Partial<DTO.HeaderContentMetadata>): DTO.HeaderContentMetadata {
    const defaultObject: DTO.HeaderContentMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderContentMetadata"
    };
    return { ...defaultObject, ...params };
}

export function createFooterContentMetadata(params: Partial<DTO.FooterContentMetadata>): DTO.FooterContentMetadata {
    const defaultObject: DTO.FooterContentMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterContentMetadata"
    };
    return { ...defaultObject, ...params };
}


export function createPageConfigMetadata(params: Partial<DTO.PageConfigMetadata>): DTO.PageConfigMetadata {
    const defaultObject: DTO.PageConfigMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageConfigMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createPageContentMetadata(params: Partial<DTO.PageContentMetadata>): DTO.PageContentMetadata {
    const defaultObject: DTO.PageContentMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageContentMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createAreaConfigMetadata(params: Partial<DTO.AreaConfigMetadata>): DTO.AreaConfigMetadata {
    const defaultObject: DTO.AreaConfigMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaConfigMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createBlockConfigMetadata(params: Partial<DTO.BlockConfigMetadata>): DTO.BlockConfigMetadata {
    const defaultObject: DTO.BlockConfigMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockConfigMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createAreaHTMLMetadata(params: Partial<DTO.AreaHTMLMetadata>): DTO.AreaHTMLMetadata {
    const defaultObject: DTO.AreaHTMLMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "AreaHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createBlockHTMLMetadata(params: Partial<DTO.BlockHTMLMetadata>): DTO.BlockHTMLMetadata {
    const defaultObject: DTO.BlockHTMLMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "BlockHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createPageHTMLMetadata(params: Partial<DTO.PageHTMLMetadata>): DTO.PageHTMLMetadata {
    const defaultObject: DTO.PageHTMLMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "PageHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createFooterHTMLMetadata(params: Partial<DTO.FooterHTMLMetadata>): DTO.FooterHTMLMetadata {
    const defaultObject: DTO.FooterHTMLMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createHeaderHTMLMetadata(params: Partial<DTO.HeaderHTMLMetadata>): DTO.HeaderHTMLMetadata {
    const defaultObject: DTO.HeaderHTMLMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderHTMLMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createFooterConfigMetadata(params: Partial<DTO.FooterConfigMetadata>): DTO.FooterConfigMetadata {
    const defaultObject: DTO.FooterConfigMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "FooterConfigMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createHeaderConfigMetadata(params: Partial<DTO.HeaderConfigMetadata>): DTO.HeaderConfigMetadata {
    const defaultObject: DTO.HeaderConfigMetadata = {
        createdTimestamp: 123,
        updatedTimestamp: 123,
        clazz: "HeaderConfigMetadata",
    };
    return { ...defaultObject, ...params };
}

export function createAsset(params: Partial<DTO.Asset>): DTO.Asset {
    const defaultAsset: DTO.Asset = {
        uuid: '',
        name: '',
        path: '',
        s3Path: '',
        s3Link: '',
        tag: DTO.AssetTagEnum.SCRIPT, // Use your default enum value here
        position: DTO.AssetPositionEnum.BODY_END, // Use your default enum value here
        clazz: "Asset"
    };

    return { ...defaultAsset, ...params };
}

export function createLinkAsset(params: Partial<DTO.LinkAsset>): DTO.LinkAsset {
    const defaultLinkAsset: DTO.LinkAsset = {
        ...createAsset({tag: DTO.AssetTagEnum.LINK, ...params}),
        rel: DTO.AssetRelEnum.STYLESHEET, // Use your default enum value here
        clazz: "LinkAsset"
    };

    return { ...defaultLinkAsset, ...params };
}


export function createScriptAsset(params: Partial<DTO.ScriptAsset>): DTO.ScriptAsset {
    const defaultScriptAsset: DTO.ScriptAsset = {
        ...createAsset({tag: DTO.AssetTagEnum.SCRIPT, ...params}),
        isAsync: false,
        isDefer: false,
        type: DTO.AssetTypeEnum.JS,
        clazz: "ScriptAsset"
    };

    return { ...defaultScriptAsset, ...params };
}

export function createStyleAsset(params: Partial<DTO.StyleAsset>): DTO.StyleAsset {
    const defaultStyleAsset: DTO.StyleAsset = {
        ...createAsset({tag: DTO.AssetTagEnum.STYLE, ...params}),
        type: DTO.AssetTypeEnum.CSS,
        clazz: "StyleAsset"
    };

    return { ...defaultStyleAsset, ...params };
}