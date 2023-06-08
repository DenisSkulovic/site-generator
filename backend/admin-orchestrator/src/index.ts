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
import * as pageHTMLObjects from "./logic/handlers/pageHTMLObjects";
import * as pages from "./logic/handlers/pages";
import * as product from "./logic/handlers/product";
import * as siteConfig from "./logic/handlers/site-config";




dotenv.config()

type HandlerFunction = (event: APIGatewayEvent, env: "dev" | "prod") => Promise<any>;
type Routes = Record<string, HandlerFunction>;
const routes: Routes = {
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
};


export const handler: HandlerFunction = async (
    event: APIGatewayEvent,
    context: Context,
    callback?: APIGatewayProxyCallbackV2,
): Promise<APIGatewayProxyResult> => {
    if (process.env.NODE_ENV === "production") console.log(`event :>> `, event);

    const env: "dev" | "prod" = "dev" // TODO make dynamic

    const path = `${event.httpMethod} /promo${event.resource}`;

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
