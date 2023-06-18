import * as DTO from ".";
export declare function createPageConfig(params: Partial<DTO.PageConfig>): DTO.PageConfig;
export declare function createPageContent(params: Partial<DTO.PageContent>): DTO.PageContent;
export declare function createAreaConfig(params: Partial<DTO.AreaConfig>): DTO.AreaConfig;
export declare function createBlockConfig(params: Partial<DTO.BlockConfig>): DTO.BlockConfig;
export declare function createAreaContent(params: Partial<DTO.AreaContent>): DTO.AreaContent;
export declare function createBlockContent(params: Partial<DTO.BlockContent>): DTO.BlockContent;
export declare function createGenerateAreaRequest(params: Partial<DTO.GenerateAreaRequest>): DTO.GenerateAreaRequest;
export declare function createGenerateAreaResponse(params: Partial<DTO.GenerateAreaResponse>): DTO.GenerateAreaResponse;
export declare function createGenerateBlockRequest(params: Partial<DTO.GenerateBlockRequest>): DTO.GenerateBlockRequest;
export declare function createGenerateBlockResponse(params: Partial<DTO.GenerateBlockResponse>): DTO.GenerateBlockResponse;
export declare function createGeneratePageRequest(params: Partial<DTO.GeneratePageRequest>): DTO.GeneratePageRequest;
export declare function createGeneratePageResponse(params: Partial<DTO.GeneratePageResponse>): DTO.GeneratePageResponse;
export declare function createPageHTMLObject(params: Partial<DTO.PageHTMLObject>): DTO.PageHTMLObject;
export declare function createAreaHTMLObject(params: Partial<DTO.AreaHTMLObject>): DTO.AreaHTMLObject;
export declare function createBlockHTMLObject(params: Partial<DTO.BlockHTMLObject>): DTO.BlockHTMLObject;
export declare function createProduct(params: Partial<DTO.Product>): DTO.Product;
export declare function createMetadata(params: Partial<DTO.Metadata>): DTO.Metadata;
export declare const createNavItem: ({ label, url, }: {
    label?: string | undefined;
    url?: string | undefined;
}) => DTO.NavItem;
export declare const createHeaderContent: ({ uuid, logoUrl, logoAlt, navItems, metadata }: {
    uuid?: string | undefined;
    logoUrl?: string | undefined;
    logoAlt?: string | undefined;
    navItems?: DTO.NavItem[] | undefined;
    metadata?: DTO.HeaderContentMetadata | undefined;
}) => DTO.HeaderContent;
export declare const createHeaderConfig: ({ uuid, templateVersion, bootstrapVersion, isIncludeNavbar, metadata }: {
    uuid?: string | undefined;
    templateVersion?: DTO.HeaderTemplateVersionEnum | undefined;
    bootstrapVersion?: DTO.BootstrapVersionEnum | undefined;
    isIncludeNavbar?: boolean | undefined;
    metadata?: DTO.HeaderConfigMetadata | undefined;
}) => DTO.HeaderConfig;
export declare const createFooterContent: ({ uuid, email, metadata }: {
    uuid?: string | undefined;
    email?: string | undefined;
    metadata?: DTO.FooterContentMetadata | undefined;
}) => DTO.FooterContent;
export declare const createFooterConfig: ({ uuid, templateVersion, bootstrapVersion, metadata }: {
    uuid?: string | undefined;
    templateVersion?: DTO.FooterTemplateVersionEnum | undefined;
    bootstrapVersion?: DTO.BootstrapVersionEnum | undefined;
    metadata?: DTO.FooterConfigMetadata | undefined;
}) => DTO.FooterConfig;
export declare const createGenerateFooterRequest: ({ content, config }: {
    content?: DTO.FooterContent | undefined;
    config?: DTO.FooterConfig | undefined;
}) => DTO.GenerateFooterRequest;
export declare const createGenerateHeaderRequest: ({ content, config }: {
    content?: DTO.HeaderContent | undefined;
    config?: DTO.HeaderConfig | undefined;
}) => DTO.GenerateHeaderRequest;
export declare const createFooterHTMLObject: ({ uuid, html, metadata }: {
    uuid?: string | undefined;
    html?: string | undefined;
    metadata?: DTO.FooterHTMLMetadata | undefined;
}) => DTO.FooterHTMLObject;
export declare const createHeaderHTMLObject: ({ uuid, html, metadata }: {
    uuid?: string | undefined;
    html?: string | undefined;
    metadata?: DTO.HeaderHTMLMetadata | undefined;
}) => DTO.HeaderHTMLObject;
export declare const createGenerateFooterResponse: ({ data }: {
    data?: DTO.FooterHTMLObject | undefined;
}) => DTO.GenerateFooterResponse;
export declare const createGenerateHeaderResponse: ({ data }: {
    data?: DTO.HeaderHTMLObject | undefined;
}) => DTO.GenerateHeaderResponse;
export declare function createBlockContent_HTML({ uuid, data, metadata, }: {
    uuid?: string | undefined;
    data?: {
        html: string;
    } | undefined;
    metadata?: DTO.BlockContentMetadata | undefined;
}): DTO.BlockContent_HTML;
export declare function createBlockContent_IMAGE({ uuid, data, metadata }: {
    uuid?: string | undefined;
    data?: {
        imgSrc: string;
        imgAlt: string;
    } | undefined;
    metadata?: DTO.BlockContentMetadata | undefined;
}): DTO.BlockContent_IMAGE;
export declare function createBlockContent_TEXT({ uuid, data, metadata, }: {
    uuid?: string | undefined;
    data?: {
        text: string;
    } | undefined;
    metadata?: DTO.BlockContentMetadata | undefined;
}): DTO.BlockContent_TEXT;
export declare function createAreaContentMetadata(params: Partial<DTO.AreaContentMetadata>): DTO.AreaContentMetadata;
export declare function createBlockContentMetadata(params: Partial<DTO.BlockContentMetadata>): DTO.BlockContentMetadata;
export declare function createHeaderContentMetadata(params: Partial<DTO.HeaderContentMetadata>): DTO.HeaderContentMetadata;
export declare function createFooterContentMetadata(params: Partial<DTO.FooterContentMetadata>): DTO.FooterContentMetadata;
export declare function createPageConfigMetadata(params: Partial<DTO.PageConfigMetadata>): DTO.PageConfigMetadata;
export declare function createPageContentMetadata(params: Partial<DTO.PageContentMetadata>): DTO.PageContentMetadata;
export declare function createAreaConfigMetadata(params: Partial<DTO.AreaConfigMetadata>): DTO.AreaConfigMetadata;
export declare function createBlockConfigMetadata(params: Partial<DTO.BlockConfigMetadata>): DTO.BlockConfigMetadata;
export declare function createAreaHTMLMetadata(params: Partial<DTO.AreaHTMLMetadata>): DTO.AreaHTMLMetadata;
export declare function createBlockHTMLMetadata(params: Partial<DTO.BlockHTMLMetadata>): DTO.BlockHTMLMetadata;
export declare function createPageHTMLMetadata(params: Partial<DTO.PageHTMLMetadata>): DTO.PageHTMLMetadata;
export declare function createFooterHTMLMetadata(params: Partial<DTO.FooterHTMLMetadata>): DTO.FooterHTMLMetadata;
export declare function createHeaderHTMLMetadata(params: Partial<DTO.HeaderHTMLMetadata>): DTO.HeaderHTMLMetadata;
export declare function createFooterConfigMetadata(params: Partial<DTO.FooterConfigMetadata>): DTO.FooterConfigMetadata;
export declare function createHeaderConfigMetadata(params: Partial<DTO.HeaderConfigMetadata>): DTO.HeaderConfigMetadata;
export declare function createAsset(params: Partial<DTO.Asset>): DTO.Asset;
export declare function createLinkAsset(params: Partial<DTO.LinkAsset>): DTO.LinkAsset;
export declare function createScriptAsset(params: Partial<DTO.ScriptAsset>): DTO.ScriptAsset;
//# sourceMappingURL=mockFactories.d.ts.map