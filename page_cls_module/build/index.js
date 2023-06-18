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
exports.BlockConfig = exports.AreaLayoutEnum = exports.buildAreaHTMLObject = exports.AreaHTMLObject = exports.buildAreaHTMLMetadata = exports.AreaHTMLMetadata = exports.buildAreaContentMetadata = exports.AreaContentMetadata = exports.buildAreaContent = exports.AreaContent = exports.buildAreaConfigMetadata = exports.AreaConfigMetadata = exports.buildAreaConfig = exports.AreaConfig = exports.GenerateFooterResponse = exports.buildGenerateFooterRequest = exports.GenerateFooterRequest = exports.buildFooterHTMLObject = exports.FooterHTMLObject = exports.buildFooterHTMLMetadata = exports.FooterHTMLMetadata = exports.buildFooterConfigMetadata = exports.FooterConfigMetadata = exports.buildFooterConfig = exports.FooterConfig = exports.buildFooterContentMetadata = exports.FooterContentMetadata = exports.buildFooterContent = exports.FooterContent = exports.GenerateHeaderResponse = exports.buildGenerateHeaderRequest = exports.GenerateHeaderRequest = exports.buildHeaderHTMLMetadata = exports.HeaderHTMLMetadata = exports.buildHeaderHTMLObject = exports.HeaderHTMLObject = exports.buildHeaderConfigMetadata = exports.HeaderConfigMetadata = exports.buildHeaderConfig = exports.HeaderConfig = exports.buildNavItem = exports.NavItem = exports.buildHeaderContentMetadata = exports.HeaderContentMetadata = exports.buildHeaderContent = exports.HeaderContent = exports.Metadata = exports.buildProduct = exports.Product = exports.mockFactories = void 0;
exports.ScriptAsset = exports.LinkAsset = exports.Asset = exports.AssetPositionEnum = exports.AssetRelEnum = exports.AssetTagEnum = exports.AssetTypeEnum = exports.LangEnum = exports.HeaderTemplateVersionEnum = exports.FooterTemplateVersionEnum = exports.HeadVersionEnum = exports.SkeletonVersionEnum = exports.buildPageHTMLObject = exports.PageHTMLObject = exports.buildPageHTMLMetadata = exports.PageHTMLMetadata = exports.buildPageContentMetadata = exports.PageContentMetadata = exports.buildPageContent = exports.PageContent = exports.buildPageConfigMetadata = exports.PageConfigMetadata = exports.buildPageConfig = exports.PageConfig = exports.GeneratePageResponse = exports.buildGeneratePageRequest = exports.GeneratePageRequest = exports.GenerateBlockResponse = exports.buildGenerateBlockRequest = exports.GenerateBlockRequest = exports.GenerateAreaResponse = exports.buildGenerateAreaRequest = exports.GenerateAreaRequest = exports.BootstrapVersionEnum = exports.BlockTemplateEnum = exports.buildBlockHTMLObject = exports.BlockHTMLObject = exports.buildBlockHTMLMetadata = exports.BlockHTMLMetadata = exports.buildBlockContentMetadata = exports.BlockContentMetadata = exports.BlockContent_TEXT = exports.BlockContent_IMAGE = exports.BlockContent_HTML = exports.buildBlockContent = exports.BlockContent = exports.buildBlockConfigMetadata = exports.BlockConfigMetadata = exports.buildBlockConfig = void 0;
exports.mockFactories = __importStar(require("./mockFactories"));
// misc
var Product_1 = require("./components/Product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return Product_1.Product; } });
Object.defineProperty(exports, "buildProduct", { enumerable: true, get: function () { return Product_1.buildProduct; } });
var Metadata_1 = require("./components/Metadata");
Object.defineProperty(exports, "Metadata", { enumerable: true, get: function () { return Metadata_1.Metadata; } });
/**
 * HEADER
 */
var HeaderContent_1 = require("./components/header/HeaderContent");
Object.defineProperty(exports, "HeaderContent", { enumerable: true, get: function () { return HeaderContent_1.HeaderContent; } });
Object.defineProperty(exports, "buildHeaderContent", { enumerable: true, get: function () { return HeaderContent_1.buildHeaderContent; } });
var HeaderContentMetadata_1 = require("./components/header/HeaderContentMetadata");
Object.defineProperty(exports, "HeaderContentMetadata", { enumerable: true, get: function () { return HeaderContentMetadata_1.HeaderContentMetadata; } });
Object.defineProperty(exports, "buildHeaderContentMetadata", { enumerable: true, get: function () { return HeaderContentMetadata_1.buildHeaderContentMetadata; } });
var NavItem_1 = require("./components/header/NavItem");
Object.defineProperty(exports, "NavItem", { enumerable: true, get: function () { return NavItem_1.NavItem; } });
Object.defineProperty(exports, "buildNavItem", { enumerable: true, get: function () { return NavItem_1.buildNavItem; } });
var HeaderConfig_1 = require("./components/header/HeaderConfig");
Object.defineProperty(exports, "HeaderConfig", { enumerable: true, get: function () { return HeaderConfig_1.HeaderConfig; } });
Object.defineProperty(exports, "buildHeaderConfig", { enumerable: true, get: function () { return HeaderConfig_1.buildHeaderConfig; } });
var HeaderConfigMetadata_1 = require("./components/header/HeaderConfigMetadata");
Object.defineProperty(exports, "HeaderConfigMetadata", { enumerable: true, get: function () { return HeaderConfigMetadata_1.HeaderConfigMetadata; } });
Object.defineProperty(exports, "buildHeaderConfigMetadata", { enumerable: true, get: function () { return HeaderConfigMetadata_1.buildHeaderConfigMetadata; } });
var HeaderHTMLObject_1 = require("./components/header/HeaderHTMLObject");
Object.defineProperty(exports, "HeaderHTMLObject", { enumerable: true, get: function () { return HeaderHTMLObject_1.HeaderHTMLObject; } });
Object.defineProperty(exports, "buildHeaderHTMLObject", { enumerable: true, get: function () { return HeaderHTMLObject_1.buildHeaderHTMLObject; } });
var HeaderHTMLMetadata_1 = require("./components/header/HeaderHTMLMetadata");
Object.defineProperty(exports, "HeaderHTMLMetadata", { enumerable: true, get: function () { return HeaderHTMLMetadata_1.HeaderHTMLMetadata; } });
Object.defineProperty(exports, "buildHeaderHTMLMetadata", { enumerable: true, get: function () { return HeaderHTMLMetadata_1.buildHeaderHTMLMetadata; } });
var GenerateHeaderRequest_1 = require("./components/header/GenerateHeaderRequest");
Object.defineProperty(exports, "GenerateHeaderRequest", { enumerable: true, get: function () { return GenerateHeaderRequest_1.GenerateHeaderRequest; } });
Object.defineProperty(exports, "buildGenerateHeaderRequest", { enumerable: true, get: function () { return GenerateHeaderRequest_1.buildGenerateHeaderRequest; } });
var GenerateHeaderResponse_1 = require("./components/header/GenerateHeaderResponse");
Object.defineProperty(exports, "GenerateHeaderResponse", { enumerable: true, get: function () { return GenerateHeaderResponse_1.GenerateHeaderResponse; } });
/**
 * FOOTER
 */
var FooterContent_1 = require("./components/footer/FooterContent");
Object.defineProperty(exports, "FooterContent", { enumerable: true, get: function () { return FooterContent_1.FooterContent; } });
Object.defineProperty(exports, "buildFooterContent", { enumerable: true, get: function () { return FooterContent_1.buildFooterContent; } });
var FooterContentMetadata_1 = require("./components/footer/FooterContentMetadata");
Object.defineProperty(exports, "FooterContentMetadata", { enumerable: true, get: function () { return FooterContentMetadata_1.FooterContentMetadata; } });
Object.defineProperty(exports, "buildFooterContentMetadata", { enumerable: true, get: function () { return FooterContentMetadata_1.buildFooterContentMetadata; } });
var FooterConfig_1 = require("./components/footer/FooterConfig");
Object.defineProperty(exports, "FooterConfig", { enumerable: true, get: function () { return FooterConfig_1.FooterConfig; } });
Object.defineProperty(exports, "buildFooterConfig", { enumerable: true, get: function () { return FooterConfig_1.buildFooterConfig; } });
var FooterConfigMetadata_1 = require("./components/footer/FooterConfigMetadata");
Object.defineProperty(exports, "FooterConfigMetadata", { enumerable: true, get: function () { return FooterConfigMetadata_1.FooterConfigMetadata; } });
Object.defineProperty(exports, "buildFooterConfigMetadata", { enumerable: true, get: function () { return FooterConfigMetadata_1.buildFooterConfigMetadata; } });
var FooterHTMLMetadata_1 = require("./components/footer/FooterHTMLMetadata");
Object.defineProperty(exports, "FooterHTMLMetadata", { enumerable: true, get: function () { return FooterHTMLMetadata_1.FooterHTMLMetadata; } });
Object.defineProperty(exports, "buildFooterHTMLMetadata", { enumerable: true, get: function () { return FooterHTMLMetadata_1.buildFooterHTMLMetadata; } });
var FooterHTMLObject_1 = require("./components/footer/FooterHTMLObject");
Object.defineProperty(exports, "FooterHTMLObject", { enumerable: true, get: function () { return FooterHTMLObject_1.FooterHTMLObject; } });
Object.defineProperty(exports, "buildFooterHTMLObject", { enumerable: true, get: function () { return FooterHTMLObject_1.buildFooterHTMLObject; } });
var GenerateFooterRequest_1 = require("./components/footer/GenerateFooterRequest");
Object.defineProperty(exports, "GenerateFooterRequest", { enumerable: true, get: function () { return GenerateFooterRequest_1.GenerateFooterRequest; } });
Object.defineProperty(exports, "buildGenerateFooterRequest", { enumerable: true, get: function () { return GenerateFooterRequest_1.buildGenerateFooterRequest; } });
var GenerateFooterResponse_1 = require("./components/footer/GenerateFooterResponse");
Object.defineProperty(exports, "GenerateFooterResponse", { enumerable: true, get: function () { return GenerateFooterResponse_1.GenerateFooterResponse; } });
/**
 * PAGE GENERATOR
 */
var AreaConfig_1 = require("./components/page/Config/AreaConfig");
Object.defineProperty(exports, "AreaConfig", { enumerable: true, get: function () { return AreaConfig_1.AreaConfig; } });
Object.defineProperty(exports, "buildAreaConfig", { enumerable: true, get: function () { return AreaConfig_1.buildAreaConfig; } });
var AreaConfigMetadata_1 = require("./components/page/Config/AreaConfigMetadata");
Object.defineProperty(exports, "AreaConfigMetadata", { enumerable: true, get: function () { return AreaConfigMetadata_1.AreaConfigMetadata; } });
Object.defineProperty(exports, "buildAreaConfigMetadata", { enumerable: true, get: function () { return AreaConfigMetadata_1.buildAreaConfigMetadata; } });
var AreaContent_1 = require("./components/page/Content/AreaContent");
Object.defineProperty(exports, "AreaContent", { enumerable: true, get: function () { return AreaContent_1.AreaContent; } });
Object.defineProperty(exports, "buildAreaContent", { enumerable: true, get: function () { return AreaContent_1.buildAreaContent; } });
var AreaContentMetadata_1 = require("./components/page/Content/AreaContentMetadata");
Object.defineProperty(exports, "AreaContentMetadata", { enumerable: true, get: function () { return AreaContentMetadata_1.AreaContentMetadata; } });
Object.defineProperty(exports, "buildAreaContentMetadata", { enumerable: true, get: function () { return AreaContentMetadata_1.buildAreaContentMetadata; } });
var AreaHTMLMetadata_1 = require("./components/page/HTMLObject/AreaHTMLMetadata");
Object.defineProperty(exports, "AreaHTMLMetadata", { enumerable: true, get: function () { return AreaHTMLMetadata_1.AreaHTMLMetadata; } });
Object.defineProperty(exports, "buildAreaHTMLMetadata", { enumerable: true, get: function () { return AreaHTMLMetadata_1.buildAreaHTMLMetadata; } });
var AreaHTMLObject_1 = require("./components/page/HTMLObject/AreaHTMLObject");
Object.defineProperty(exports, "AreaHTMLObject", { enumerable: true, get: function () { return AreaHTMLObject_1.AreaHTMLObject; } });
Object.defineProperty(exports, "buildAreaHTMLObject", { enumerable: true, get: function () { return AreaHTMLObject_1.buildAreaHTMLObject; } });
var AreaLayoutEnum_1 = require("./components/page/enum/AreaLayoutEnum");
Object.defineProperty(exports, "AreaLayoutEnum", { enumerable: true, get: function () { return AreaLayoutEnum_1.AreaLayoutEnum; } });
var BlockConfig_1 = require("./components/page/Config/BlockConfig");
Object.defineProperty(exports, "BlockConfig", { enumerable: true, get: function () { return BlockConfig_1.BlockConfig; } });
Object.defineProperty(exports, "buildBlockConfig", { enumerable: true, get: function () { return BlockConfig_1.buildBlockConfig; } });
var BlockConfigMetadata_1 = require("./components/page/Config/BlockConfigMetadata");
Object.defineProperty(exports, "BlockConfigMetadata", { enumerable: true, get: function () { return BlockConfigMetadata_1.BlockConfigMetadata; } });
Object.defineProperty(exports, "buildBlockConfigMetadata", { enumerable: true, get: function () { return BlockConfigMetadata_1.buildBlockConfigMetadata; } });
var BlockContent_1 = require("./components/page/Content/BlockContent");
Object.defineProperty(exports, "BlockContent", { enumerable: true, get: function () { return BlockContent_1.BlockContent; } });
Object.defineProperty(exports, "buildBlockContent", { enumerable: true, get: function () { return BlockContent_1.buildBlockContent; } });
var BlockContent_HTML_1 = require("./components/page/Content/BlockContent_HTML");
Object.defineProperty(exports, "BlockContent_HTML", { enumerable: true, get: function () { return BlockContent_HTML_1.BlockContent_HTML; } });
var BlockContent_IMAGE_1 = require("./components/page/Content/BlockContent_IMAGE");
Object.defineProperty(exports, "BlockContent_IMAGE", { enumerable: true, get: function () { return BlockContent_IMAGE_1.BlockContent_IMAGE; } });
var BlockContent_TEXT_1 = require("./components/page/Content/BlockContent_TEXT");
Object.defineProperty(exports, "BlockContent_TEXT", { enumerable: true, get: function () { return BlockContent_TEXT_1.BlockContent_TEXT; } });
var BlockContentMetadata_1 = require("./components/page/Content/BlockContentMetadata");
Object.defineProperty(exports, "BlockContentMetadata", { enumerable: true, get: function () { return BlockContentMetadata_1.BlockContentMetadata; } });
Object.defineProperty(exports, "buildBlockContentMetadata", { enumerable: true, get: function () { return BlockContentMetadata_1.buildBlockContentMetadata; } });
var BlockHTMLMetadata_1 = require("./components/page/HTMLObject/BlockHTMLMetadata");
Object.defineProperty(exports, "BlockHTMLMetadata", { enumerable: true, get: function () { return BlockHTMLMetadata_1.BlockHTMLMetadata; } });
Object.defineProperty(exports, "buildBlockHTMLMetadata", { enumerable: true, get: function () { return BlockHTMLMetadata_1.buildBlockHTMLMetadata; } });
var BlockHTMLObject_1 = require("./components/page/HTMLObject/BlockHTMLObject");
Object.defineProperty(exports, "BlockHTMLObject", { enumerable: true, get: function () { return BlockHTMLObject_1.BlockHTMLObject; } });
Object.defineProperty(exports, "buildBlockHTMLObject", { enumerable: true, get: function () { return BlockHTMLObject_1.buildBlockHTMLObject; } });
var BlockTemplateEnum_1 = require("./components/page/enum/BlockTemplateEnum");
Object.defineProperty(exports, "BlockTemplateEnum", { enumerable: true, get: function () { return BlockTemplateEnum_1.BlockTemplateEnum; } });
var BootstrapVersionEnum_1 = require("./components/page/enum/BootstrapVersionEnum");
Object.defineProperty(exports, "BootstrapVersionEnum", { enumerable: true, get: function () { return BootstrapVersionEnum_1.BootstrapVersionEnum; } });
var GenerateAreaRequest_1 = require("./components/page/GenerateAreaRequest");
Object.defineProperty(exports, "GenerateAreaRequest", { enumerable: true, get: function () { return GenerateAreaRequest_1.GenerateAreaRequest; } });
Object.defineProperty(exports, "buildGenerateAreaRequest", { enumerable: true, get: function () { return GenerateAreaRequest_1.buildGenerateAreaRequest; } });
var GenerateAreaResponse_1 = require("./components/page/GenerateAreaResponse");
Object.defineProperty(exports, "GenerateAreaResponse", { enumerable: true, get: function () { return GenerateAreaResponse_1.GenerateAreaResponse; } });
var GenerateBlockRequest_1 = require("./components/page/GenerateBlockRequest");
Object.defineProperty(exports, "GenerateBlockRequest", { enumerable: true, get: function () { return GenerateBlockRequest_1.GenerateBlockRequest; } });
Object.defineProperty(exports, "buildGenerateBlockRequest", { enumerable: true, get: function () { return GenerateBlockRequest_1.buildGenerateBlockRequest; } });
var GenerateBlockResponse_1 = require("./components/page/GenerateBlockResponse");
Object.defineProperty(exports, "GenerateBlockResponse", { enumerable: true, get: function () { return GenerateBlockResponse_1.GenerateBlockResponse; } });
var GeneratePageRequest_1 = require("./components/page/GeneratePageRequest");
Object.defineProperty(exports, "GeneratePageRequest", { enumerable: true, get: function () { return GeneratePageRequest_1.GeneratePageRequest; } });
Object.defineProperty(exports, "buildGeneratePageRequest", { enumerable: true, get: function () { return GeneratePageRequest_1.buildGeneratePageRequest; } });
var GeneratePageResponse_1 = require("./components/page/GeneratePageResponse");
Object.defineProperty(exports, "GeneratePageResponse", { enumerable: true, get: function () { return GeneratePageResponse_1.GeneratePageResponse; } });
var PageConfig_1 = require("./components/page/Config/PageConfig");
Object.defineProperty(exports, "PageConfig", { enumerable: true, get: function () { return PageConfig_1.PageConfig; } });
Object.defineProperty(exports, "buildPageConfig", { enumerable: true, get: function () { return PageConfig_1.buildPageConfig; } });
var PageConfigMetadata_1 = require("./components/page/Config/PageConfigMetadata");
Object.defineProperty(exports, "PageConfigMetadata", { enumerable: true, get: function () { return PageConfigMetadata_1.PageConfigMetadata; } });
Object.defineProperty(exports, "buildPageConfigMetadata", { enumerable: true, get: function () { return PageConfigMetadata_1.buildPageConfigMetadata; } });
var PageContent_1 = require("./components/page/Content/PageContent");
Object.defineProperty(exports, "PageContent", { enumerable: true, get: function () { return PageContent_1.PageContent; } });
Object.defineProperty(exports, "buildPageContent", { enumerable: true, get: function () { return PageContent_1.buildPageContent; } });
var PageContentMetadata_1 = require("./components/page/Content/PageContentMetadata");
Object.defineProperty(exports, "PageContentMetadata", { enumerable: true, get: function () { return PageContentMetadata_1.PageContentMetadata; } });
Object.defineProperty(exports, "buildPageContentMetadata", { enumerable: true, get: function () { return PageContentMetadata_1.buildPageContentMetadata; } });
var PageHTMLMetadata_1 = require("./components/page/HTMLObject/PageHTMLMetadata");
Object.defineProperty(exports, "PageHTMLMetadata", { enumerable: true, get: function () { return PageHTMLMetadata_1.PageHTMLMetadata; } });
Object.defineProperty(exports, "buildPageHTMLMetadata", { enumerable: true, get: function () { return PageHTMLMetadata_1.buildPageHTMLMetadata; } });
var PageHTMLObject_1 = require("./components/page/HTMLObject/PageHTMLObject");
Object.defineProperty(exports, "PageHTMLObject", { enumerable: true, get: function () { return PageHTMLObject_1.PageHTMLObject; } });
Object.defineProperty(exports, "buildPageHTMLObject", { enumerable: true, get: function () { return PageHTMLObject_1.buildPageHTMLObject; } });
var SkeletonVersionEnum_1 = require("./components/page/enum/SkeletonVersionEnum");
Object.defineProperty(exports, "SkeletonVersionEnum", { enumerable: true, get: function () { return SkeletonVersionEnum_1.SkeletonVersionEnum; } });
var HeadVersionEnum_1 = require("./components/page/enum/HeadVersionEnum");
Object.defineProperty(exports, "HeadVersionEnum", { enumerable: true, get: function () { return HeadVersionEnum_1.HeadVersionEnum; } });
var FooterTemplateVersionEnum_1 = require("./components/page/enum/FooterTemplateVersionEnum");
Object.defineProperty(exports, "FooterTemplateVersionEnum", { enumerable: true, get: function () { return FooterTemplateVersionEnum_1.FooterTemplateVersionEnum; } });
var HeaderTemplateVersionEnum_1 = require("./components/page/enum/HeaderTemplateVersionEnum");
Object.defineProperty(exports, "HeaderTemplateVersionEnum", { enumerable: true, get: function () { return HeaderTemplateVersionEnum_1.HeaderTemplateVersionEnum; } });
var LangEnum_1 = require("./components/page/enum/LangEnum");
Object.defineProperty(exports, "LangEnum", { enumerable: true, get: function () { return LangEnum_1.LangEnum; } });
/**
 * ASSET
 */
var AssetTypeEnum_1 = require("./components/asset/AssetTypeEnum");
Object.defineProperty(exports, "AssetTypeEnum", { enumerable: true, get: function () { return AssetTypeEnum_1.AssetTypeEnum; } });
var AssetTagEnum_1 = require("./components/asset/AssetTagEnum");
Object.defineProperty(exports, "AssetTagEnum", { enumerable: true, get: function () { return AssetTagEnum_1.AssetTagEnum; } });
var AssetRelEnum_1 = require("./components/asset/AssetRelEnum");
Object.defineProperty(exports, "AssetRelEnum", { enumerable: true, get: function () { return AssetRelEnum_1.AssetRelEnum; } });
var AssetPositionEnum_1 = require("./components/asset/AssetPositionEnum");
Object.defineProperty(exports, "AssetPositionEnum", { enumerable: true, get: function () { return AssetPositionEnum_1.AssetPositionEnum; } });
var Asset_1 = require("./components/asset/Asset");
Object.defineProperty(exports, "Asset", { enumerable: true, get: function () { return Asset_1.Asset; } });
var LinkAsset_1 = require("./components/asset/LinkAsset");
Object.defineProperty(exports, "LinkAsset", { enumerable: true, get: function () { return LinkAsset_1.LinkAsset; } });
var ScriptAsset_1 = require("./components/asset/ScriptAsset");
Object.defineProperty(exports, "ScriptAsset", { enumerable: true, get: function () { return ScriptAsset_1.ScriptAsset; } });
//# sourceMappingURL=index.js.map