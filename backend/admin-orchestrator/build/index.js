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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handleError_1 = __importDefault(require("./logic/handleError"));
const Response_1 = __importDefault(require("./classes/Response"));
const dotenv = __importStar(require("dotenv"));
const auth = __importStar(require("./logic/handlers/auth"));
const cloudfront = __importStar(require("./logic/handlers/cloudfront"));
const footer = __importStar(require("./logic/handlers/footer"));
const header = __importStar(require("./logic/handlers/header"));
const image = __importStar(require("./logic/handlers/image"));
const pageConfig = __importStar(require("./logic/handlers/page-config"));
const pageContent = __importStar(require("./logic/handlers/page-content"));
const pageGenerator = __importStar(require("./logic/handlers/page-generator"));
const pageHTMLObjects = __importStar(require("./logic/handlers/pageHTMLObjects"));
const pages = __importStar(require("./logic/handlers/pages"));
const product = __importStar(require("./logic/handlers/product"));
const siteConfig = __importStar(require("./logic/handlers/site-config"));
const pageAssets = __importStar(require("./logic/handlers/page-assets"));
dotenv.config();
const routes = {
    'POST /admin/auth/login': auth.handleLogin,
    'POST /admin/auth/refresh': auth.handleRefresh,
    'GET /admin/cloudfront/invalidate': cloudfront.handleInvalidateByRegex,
    'GET /admin/footer-config': footer.handleFooterConfigGet,
    'PUT /admin/footer-config': footer.handleFooterConfigPut,
    'GET /admin/footer-content': footer.handleFooterContentGet,
    'PUT /admin/footer-content': footer.handleFooterContentPut,
    'GET /admin/header-config': header.handleHeaderConfigGet,
    'PUT /admin/header-config': header.handleHeaderConfigPut,
    'GET /admin/header-content': header.handleHeaderContentGet,
    'PUT /admin/header-content': header.handleHeaderContentPut,
    'GET /admin/image/{key}': image.handleImageGet,
    'POST /admin/image/{key}': image.handleImagePost,
    'PUT /admin/image': image.handleImagePut,
    'DELETE /admin/image/{key}': image.handleImageDelete,
    'GET /admin/page-config/{uuid}': pageConfig.handlePageConfigGet,
    'POST /admin/page-config': pageConfig.handlePageConfigPost,
    'PUT /admin/page-config/{uuid}': pageConfig.handlePageConfigPut,
    'DELETE /admin/page-config/{uuid}': pageConfig.handlePageConfigDelete,
    'GET /admin/page-content/{uuid}': pageContent.handlePageContentGet,
    'POST /admin/page-content': pageContent.handlePageContentPost,
    'PUT /admin/page-content/{uuid}': pageContent.handlePageContentPut,
    'DELETE /admin/page-content/{uuid}': pageContent.handlePageContentDelete,
    'POST /admin/page-generator/footer': pageGenerator.handleGenerateFooter,
    'POST /admin/page-generator/header': pageGenerator.handleGenerateHeader,
    'POST /admin/page-generator/page': pageGenerator.handleGeneratePage,
    'GET /admin/page-html-object/all': pageHTMLObjects.handlePageHTMLObjectGetAll,
    'GET /admin/page-html-object/{key}': pageHTMLObjects.handlePageHTMLObjectGet,
    'POST /admin/page-html-object': pageHTMLObjects.handlePageHTMLObjectPost,
    'PUT /admin/page-html-object/{key}': pageHTMLObjects.handlePageHTMLObjectPut,
    'DELETE /admin/page-html-object/{key}': pageHTMLObjects.handlePageHTMLObjectDelete,
    'POST /admin/page-s3': pages.handlePagePost,
    'PUT /admin/page-s3/{key}': pages.handlePagePut,
    'DELETE /admin/page-s3/{key}': pages.handlePageDelete,
    'GET /admin/product/all': product.handleProductGetAll,
    'PUT /admin/product/all': product.handleProductPutAll,
    'GET /admin/product/{uuid}': product.handleProductGet,
    'POST /admin/product': product.handleProductPost,
    'PUT /admin/product/{uuid}': product.handleProductPut,
    'DELETE /admin/product/{uuid}': product.handleProductDelete,
    'GET /admin/site-config': siteConfig.handleSiteConfigGet,
    'PUT /admin/site-config': siteConfig.handleSiteConfigPut,
    'GET /admin/design-system': siteConfig.handleDesignSystemGet,
    'PUT /admin/design-system': siteConfig.handleDesignSystemPut,
    'POST /admin/page-assets': pageAssets.handleAssetUpload,
};
const handler = async (event, context, callback) => {
    if (process.env.NODE_ENV === "production")
        console.log(`event :>> `, event);
    const env = "dev"; // TODO make dynamic
    const path = `${event.httpMethod} /admin${event.resource}`;
    console.log(`path`, path);
    let body;
    try {
        const routeHandler = routes[path];
        if (routeHandler) {
            body = await routeHandler(event, env);
        }
        else {
            throw new Error(`Unknown route: ${path}`);
        }
        const response = new Response_1.default(200, JSON.stringify(body));
        console.log(`RESPONSE`, response);
        return response;
    }
    catch (err) {
        console.log(`err`, err);
        return await (0, handleError_1.default)(err);
    }
};
exports.handler = handler;
//# sourceMappingURL=index.js.map