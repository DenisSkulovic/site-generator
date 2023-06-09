
export * as mockFactories from "./mockFactories"

/**
 * HEADER
 */
export {HeaderContent, buildHeaderContent} from "./components/header/HeaderContent"
export {HeaderContentMetadata} from "./components/header/HeaderContentMetadata"
export {NavItem, buildNavItem} from "./components/header/NavItem"
export {HeaderConfig, buildHeaderConfig} from "./components/header/HeaderConfig"
export {HeaderConfigMetadata} from "./components/header/HeaderConfigMetadata"
export {HeaderHTMLObject, buildHeaderHTMLObject} from "./components/page/HTMLObject/HeaderHTMLObject"
export {HeaderHTMLMetadata} from "./components/page/HTMLObject/HeaderHTMLMetadata"
export {GenerateHeaderRequest, buildGenerateHeaderRequest} from "./components/header/GenerateHeaderRequest"
export {GenerateHeaderResponse} from "./components/header/GenerateHeaderResponse"


/**
 * FOOTER
 */
export {FooterContent, buildFooterContent} from "./components/footer/FooterContent"
export {FooterContentMetadata} from "./components/footer/FooterContentMetadata"
export {FooterConfig, buildFooterConfig} from "./components/footer/FooterConfig"
export {FooterConfigMetadata} from "./components/footer/FooterConfigMetadata"
export {FooterHTMLMetadata} from "./components/footer/FooterHTMLMetadata"
export {FooterHTMLObject, buildFooterHTMLObject} from "./components/footer/FooterHTMLObject"
export {GenerateFooterRequest, buildGenerateFooterRequest} from "./components/footer/GenerateFooterRequest"
export {GenerateFooterResponse} from "./components/footer/GenerateFooterResponse"


/**
 * PAGE GENERATOR
 */
export {AreaConfig, buildAreaConfig} from "./components/page/Config/AreaConfig"
export {AreaConfigMetadata} from "./components/page/Config/AreaConfigMetadata"
export {AreaContent, buildAreaContent} from "./components/page/Content/AreaContent"
export {AreaContentMetadata} from "./components/page/Content/AreaContentMetadata"
export {AreaHTMLMetadata} from "./components/page/HTMLObject/AreaHTMLMetadata"
export {AreaHTMLObject, buildAreaHTMLObject} from "./components/page/HTMLObject/AreaHTMLObject"
export {AreaLayoutEnum} from "./components/page/enum/AreaLayoutEnum"
export {BlockConfig, buildBlockConfig} from "./components/page/Config/BlockConfig"
export {BlockConfigMetadata} from "./components/page/Config/BlockConfigMetadata"
export {BlockContent, buildBlockContent} from "./components/page/Content/BlockContent"
export {BlockContent_HTML} from "./components/page/Content/BlockContent_HTML"
export {BlockContent_IMAGE} from "./components/page/Content/BlockContent_IMAGE"
export {BlockContent_TEXT} from "./components/page/Content/BlockContent_TEXT"
export {BlockContentMetadata} from "./components/page/Content/BlockContentMetadata"
export {BlockHTMLMetadata} from "./components/page/HTMLObject/BlockHTMLMetadata"
export {BlockHTMLObject, buildBlockHTMLObject} from "./components/page/HTMLObject/BlockHTMLObject"
export {BlockTemplateEnum} from "./components/page/enum/BlockTemplateEnum"
export {BootstrapVersionEnum} from "./components/page/enum/BootstrapVersionEnum"
export {GenerateAreaRequest, buildGenerateAreaRequest} from "./components/page/GenerateAreaRequest"
export {GenerateAreaResponse} from "./components/page/GenerateAreaResponse"
export {GenerateBlockRequest, buildGenerateBlockRequest} from "./components/page/GenerateBlockRequest"
export {GenerateBlockResponse} from "./components/page/GenerateBlockResponse"
export {GeneratePageRequest, buildGeneratePageRequest} from "./components/page/GeneratePageRequest"
export {GeneratePageResponse} from "./components/page/GeneratePageResponse"
export {PageConfig, buildPageConfig} from "./components/page/Config/PageConfig"
export {PageConfigMetadata} from "./components/page/Config/PageConfigMetadata"
export {PageContent, buildPageContent} from "./components/page/Content/PageContent"
export {PageContentMetadata} from "./components/page/Content/PageContentMetadata"
export {PageHTMLMetadata} from "./components/page/HTMLObject/PageHTMLMetadata"
export {PageHTMLObject, buildPageHTMLObject} from "./components/page/HTMLObject/PageHTMLObject"
export {SkeletonVersionEnum} from "./components/page/enum/SkeletonVersionEnum"
export {HeadVersionEnum} from "./components/page/enum/HeadVersionEnum"
export {FooterTemplateVersionEnum} from "./components/page/enum/FooterTemplateVersionEnum"
export {HeaderTemplateVersionEnum} from "./components/page/enum/HeaderTemplateVersionEnum"
export {LangEnum} from "./components/page/enum/LangEnum"


// misc
export {Product, buildProduct} from "./components/Product"
export {Metadata} from "./components/Metadata"