import {
    APIGatewayProxyCallbackV2,
    APIGatewayProxyResult,
    Context,
    APIGatewayEvent,
} from "aws-lambda";
import handleError from "./logic/handleError"
import Response from "./classes/Response"
import * as dotenv from "dotenv"

import * as auth from "./logic/handlers/auth";
import * as cloudfront from "./logic/handlers/cloudfront";
import * as footer from "./logic/handlers/footer";
import * as header from "./logic/handlers/header";
import * as image from "./logic/handlers/image";
import * as pageConfig from "./logic/handlers/page-config";
import * as pageContent from "./logic/handlers/page-content";
import * as pageGenerator from "./logic/handlers/page-generator";
import * as pagemetas from "./logic/handlers/pagemetas";
import * as publishing from "./logic/handlers/publishing";
import * as product from "./logic/handlers/product";
import * as siteConfig from "./logic/handlers/site-config";
import * as pageAssets from "./logic/handlers/page-assets";
import * as pageVersion from "./logic/handlers/page-version";




dotenv.config()

type HandlerFunction = (event: APIGatewayEvent, env: "dev" | "prod") => Promise<any>;
type Routes = Record<string, HandlerFunction>;
const routes: Routes = {
    'POST /auth/login': auth.handleLogin,
    'POST /auth/refresh': auth.handleRefresh,
    'GET /cloudfront/invalidate': cloudfront.handleInvalidateByRegex,
    'GET /footer-config': footer.handleFooterConfigGet,
    'PUT /footer-config': footer.handleFooterConfigPut,
    'GET /footer-content': footer.handleFooterContentGet,
    'PUT /footer-content': footer.handleFooterContentPut,
    'GET /regenerate-footer': footer.handleRegenerateFooter,
    'GET /get-footer': footer.handleGetFooterHTML,
    'GET /header-config': header.handleHeaderConfigGet,
    'PUT /header-config': header.handleHeaderConfigPut,
    'GET /header-content': header.handleHeaderContentGet,
    'PUT /header-content': header.handleHeaderContentPut,
    'GET /regenerate-header': header.handleRegenerateHeader,
    'GET /get-header': header.handleGetHeaderHTML,
    'GET /image/{key}': image.handleImageGet,
    'POST /image/{key}': image.handleImagePost,
    'PUT /image': image.handleImagePut,
    'DELETE /image/{key}': image.handleImageDelete,
    'GET /page-config/{uuid}': pageConfig.handlePageConfigGet,
    'POST /page-config': pageConfig.handlePageConfigPost,
    'DELETE /page-config/{uuid}': pageConfig.handlePageConfigDelete,
    'GET /page-content/{uuid}': pageContent.handlePageContentGet,
    'POST /page-content': pageContent.handlePageContentPost,
    'DELETE /page-content/{uuid}': pageContent.handlePageContentDelete,
    'POST /page-generator/footer': pageGenerator.handleGenerateFooter,
    'POST /page-generator/header': pageGenerator.handleGenerateHeader,
    'POST /page-generator/page': pageGenerator.handleGeneratePage,
    'GET /pagemeta/all': pagemetas.handlePagemetaGetAll,
    'GET /pagemeta': pagemetas.handlePagemetaGet,
    'PUT /pagemeta': pagemetas.handlePagemetaPut,
    'POST /pagemeta': pagemetas.handlePagemetaPost,
    'DELETE /pagemeta': pagemetas.handlePagemetaDelete,
    'GET /publishing/publish-page': publishing.handlePublishPage,
    'GET /publishing/unpublish-page': publishing.handleUnpublishPage,
    'GET /product/all': product.handleProductGetAll,
    'PUT /product/all': product.handleProductPutAll,
    'GET /product/{uuid}': product.handleProductGet,
    'POST /product': product.handleProductPost,
    'PUT /product/{uuid}': product.handleProductPut,
    'DELETE /product/{uuid}': product.handleProductDelete,
    'GET /site-config': siteConfig.handleSiteConfigGet,
    'PUT /site-config': siteConfig.handleSiteConfigPut,
    'GET /design-system': siteConfig.handleDesignSystemGet,
    'PUT /design-system': siteConfig.handleDesignSystemPut,
    'POST /page-assets': pageAssets.handleAssetUpload,
    'GET /page-versions-for-path': pageVersion.handlePageVersionsForPageGet,
    'GET /page-version': pageVersion.handlePageVersionGet,
    'POST /page-version': pageVersion.handlePageVersionPost,
    'GET /page-version-exists': pageVersion.handlePageVersionTagExists,
};


export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback?: APIGatewayProxyCallbackV2,
): Promise<APIGatewayProxyResult> => {
    if (process.env.NODE_ENV === "production") console.log(`event :>> `, event);

    const env: "dev" | "prod" = "dev" // TODO make dynamic

    const path = `${event.httpMethod} ${event.resource}`;

    console.log(`path`, path);

    let body: any;

    try {
        const routeHandler = routes[path];

        if (routeHandler) {
            body = await routeHandler(event, env);
        } else {
            throw new Error(`Unknown route: ${path}`);
        }

        const response = new Response(200, JSON.stringify(body))
        console.log(`RESPONSE`, response)
        return response
    } catch (err: any) {
        console.log(`err`, err)
        return await handleError(err)
    }
};
