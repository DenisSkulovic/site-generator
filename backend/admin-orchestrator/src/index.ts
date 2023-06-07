import {
    APIGatewayProxyCallbackV2,
    APIGatewayProxyResult,
    Context,
    APIGatewayEvent,
} from "aws-lambda";
import handleError from "./logic/handleError"
import Response from "./classes/Response"
import * as dotenv from "dotenv"

// auth
import handleLogin from "./logic/handlers/auth/handleLogin";
import handleRefresh from "./logic/handlers/auth/handleRefresh";

// invalidation
import handleInvalidateAllCache from "./logic/handlers/cloudfront/handleInvalidateAllCache";
import handleInvalidatePageCache from "./logic/handlers/cloudfront/handleInvalidatePageCache";

// footer config
import handleFooterConfigGet from "./logic/handlers/footer/handleFooterConfigGet";
import handleFooterConfigPut from "./logic/handlers/footer/handleFooterConfigPut";

// footer content
import handleFooterContentGet from "./logic/handlers/footer/handleFooterContentGet";
import handleFooterContentPut from "./logic/handlers/footer/handleFooterContentPut";

// header config
import handleHeaderConfigGet from "./logic/handlers/header/handleHeaderConfigGet";
import handleHeaderConfigPut from "./logic/handlers/header/handleHeaderConfigPut";

// header content
import handleHeaderContentGet from "./logic/handlers/header/handleHeaderContentGet";
import handleHeaderContentPut from "./logic/handlers/header/handleHeaderContentPut";

// image
import handleImageGet from "./logic/handlers/image/handleImageGet";
import handleImagePost from "./logic/handlers/image/handleImagePost";
import handleImagePut from "./logic/handlers/image/handleImagePut";
import handleImageDelete from "./logic/handlers/image/handleImageDelete";

// page config
import handlePageConfigGet from "./logic/handlers/page-config/handlePageConfigGet";
import handlePageConfigPost from "./logic/handlers/page-config/handlePageConfigPost";
import handlePageConfigPut from "./logic/handlers/page-config/handlePageConfigPut";
import handlePageConfigDelete from "./logic/handlers/page-config/handlePageConfigDelete";

// page content
import handlePageContentGet from "./logic/handlers/page-content/handlePageContentGet";
import handlePageContentPost from "./logic/handlers/page-content/handlePageContentPost";
import handlePageContentPut from "./logic/handlers/page-content/handlePageContentPut";
import handlePageContentDelete from "./logic/handlers/page-content/handlePageContentDelete";

// generate
import handleGenerateFooter from "./logic/handlers/page-generator/handleGenerateFooter";
import handleGenerateHeader from "./logic/handlers/page-generator/handleGenerateHeader";
import handleGeneratePage from "./logic/handlers/page-generator/handleGeneratePage";

// page html object
import handlePageHTMLObjectGetAll from "./logic/handlers/pageHTMLObjects/handlePageHTMLObjectGetAll";
import handlePageHTMLObjectGet from "./logic/handlers/pageHTMLObjects/handlePageHTMLObjectGet";
import handlePageHTMLObjectPost from "./logic/handlers/pageHTMLObjects/handlePageHTMLObjectPost";
import handlePageHTMLObjectPut from "./logic/handlers/pageHTMLObjects/handlePageHTMLObjectPut";
import handlePageHTMLObjectDelete from "./logic/handlers/pageHTMLObjects/handlePageHTMLObjectDelete";

// page
import handlePagePost from "./logic/handlers/pages/handlePagePost";
import handlePagePut from "./logic/handlers/pages/handlePagePut";
import handlePageDelete from "./logic/handlers/pages/handlePageDelete";

// product
import handleProductGetAll from "./logic/handlers/product/handleProductGetAll";
import handleProductGet from "./logic/handlers/product/handleProductGet";
import handleProductPost from "./logic/handlers/product/handleProductPost";
import handleProductPut from "./logic/handlers/product/handleProductPut";
import handleProductDelete from "./logic/handlers/product/handleProductDelete";

// site config
import handleSiteConfigGet from "./logic/handlers/site-config/handleSiteConfigGet";
import handleSiteConfigPut from "./logic/handlers/site-config/handleSiteConfigPut";



dotenv.config()



/**
 * 
 * @param event
 * @param context
 * @param callback
 * @returns 
 */
export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback?: APIGatewayProxyCallbackV2,
): Promise<APIGatewayProxyResult> => {
    if (process.env.NODE_ENV === "production") console.log(`event :>> `, event)

    const env: "dev" | "prod" = "dev" // TODO make dynamic

    let body: any
    const path = `${event.httpMethod} /promo${event.resource}`
    console.log(`path`, path)

    try {
        switch (path) {

            /**
             * AUTHENTICATION
             */
            /** LOGIN */
            case ("POST /admin/login"): {
                body = await handleLogin(event, env)
            }
            /** REFRESH */
            case ("POST /admin/refresh"): {
                body = await handleRefresh(event, env)
            }

            /**
             * CLOUDFRONT
             */
            /** INVALIDATE ALL CACHE */
            case ("GET /admin/cloudfront/invalidate/all"): {
                body = await handleInvalidateAllCache(event, env)
            }
            /** INVALIDATE PAGE */
            case ("GET /admin/cloudfront/invalidate"): {
                // TODO use query param for page path
                body = await handleInvalidatePageCache(event, env)
            }


            /**
             * FOOTER
             */
            /** FOOTER CONFIG GET */
            case ("GET /admin/footer-config"): {
                body = await handleFooterConfigGet(event, env)
            }
            /** FOOTER CONFIG PUT */
            case ("PUT /admin/footer-config"): {
                body = await handleFooterConfigPut(event, env)
            }
            /** FOOTER CONTENT GET */
            case ("GET /admin/footer-content"): {
                body = await handleFooterContentGet(event, env)
            }
            /** FOOTER CONTENT PUT */
            case ("PUT /admin/footer-content"): {
                body = await handleFooterContentPut(event, env)
            }


            /**
             * HEADER
             */
            /** HEADER CONFIG GET */
            case ("GET /admin/header-config"): {
                body = await handleHeaderConfigGet(event, env)
            }
            /** HEADER CONFIG PUT */
            case ("PUT /admin/header-config"): {
                body = await handleHeaderConfigPut(event, env)
            }
            /** HEADER CONTENT GET */
            case ("GET /admin/header-content"): {
                body = await handleHeaderContentGet(event, env)
            }
            /** HEADER CONTENT PUT */
            case ("PUT /admin/header-content"): {
                body = await handleHeaderContentPut(event, env)
            }


            /**
             * IMAGE
             */
            case ("GET /admin/image/{key}"): {
                body = await handleImageGet(event, env)
            }
            case ("POST /admin/image/{key}"): {
                body = await handleImagePost(event, env)
            }
            case ("PUT /admin/image"): {
                body = await handleImagePut(event, env)
            }
            case ("DELETE /admin/image/{key}"): {
                body = await handleImageDelete(event, env)
            }


            /**
            * PAGE CONFIG & CONTENT
            */
            /** PAGE CONFIG GET */
            case ("GET /admin/page-config/{uuid}"): {
                body = await handlePageConfigGet(event, env)
            }
            /** PAGE CONFIG POST */
            case ("POST /admin/page-config"): {
                body = await handlePageConfigPost(event, env)
            }
            /** PAGE CONFIG PUT */
            case ("PUT /admin/page-config/{uuid}"): {
                body = await handlePageConfigPut(event, env)
            }
            /** PAGE CONFIG DELETE */
            case ("DELETE /admin/page-config/{uuid}"): {
                body = await handlePageConfigDelete(event, env)
            }
            /** PAGE CONTENT GET */
            case ("GET /admin/page-content/{uuid}"): {
                body = await handlePageContentGet(event, env)
            }
            /** PAGE CONTENT POST */
            case ("POST /admin/page-content"): {
                body = await handlePageContentPost(event, env)
            }
            /** PAGE CONTENT PUT */
            case ("PUT /admin/page-content/{uuid}"): {
                body = await handlePageContentPut(event, env)
            }
            /** PAGE CONTENT DELETE */
            case ("DELETE /admin/page-content/{uuid}"): {
                body = await handlePageContentDelete(event, env)
            }

            /**
             * PAGE GENERATOR
             */
            case ("POST /admin/page-generator/footer"): {
                body = await handleGenerateFooter(event, env)
            }
            case ("POST /admin/page-generator/header"): {
                body = await handleGenerateHeader(event, env)
            }
            case ("POST /admin/page-generator/page"): {
                body = await handleGeneratePage(event, env)
            }

            /**
             * PAGE HTML OBJECTS
             */
            /** PAGE CONTENT GET ALL */
            case ("GET /admin/page-html-object/all"): {
                body = await handlePageHTMLObjectGetAll(event, env)
            }
            /** PAGE CONTENT GET */
            case ("GET /admin/page-html-object/{key}"): {
                body = await handlePageHTMLObjectGet(event, env)
            }
            /** PAGE CONTENT POST */
            case ("POST /admin/page-html-object"): {
                body = await handlePageHTMLObjectPost(event, env)
            }
            /** PAGE CONTENT PUT */
            case ("PUT /admin/page-html-object/{key}"): {
                body = await handlePageHTMLObjectPut(event, env)
            }
            /** PAGE CONTENT DELETE */
            case ("DELETE /admin/page-html-object/{key}"): {
                body = await handlePageHTMLObjectDelete(event, env)
            }

            /**
             * PAGES
             */
            /** PAGE CONTENT POST */
            case ("POST /admin/page-s3"): {
                body = await handlePagePost(event, env)
            }
            /** PAGE CONTENT PUT */
            case ("PUT /admin/page-s3/{key}"): {
                body = await handlePagePut(event, env)
            }
            /** PAGE CONTENT DELETE */
            case ("DELETE /admin/page-s3/{key}"): {
                body = await handlePageDelete(event, env)
            }

            
            /**
             * PRODUCTS
             */
            /** PRODUCT GET ALL */
            case ("GET /admin/product/all"): {
                body = await handleProductGetAll(event, env)
            }
            /** PRODUCT GET */
            case ("GET /admin/product/{uuid}"): {
                body = await handleProductGet(event, env)
            }
            /** PRODUCT POST */
            case ("POST /admin/product"): {
                body = await handleProductPost(event, env)
            }
            /** PRODUCT PUT */
            case ("PUT /admin/product/{uuid}"): {
                body = await handleProductPut(event, env)
            }
            /** PRODUCT DELETE */
            case ("DELETE /admin/product/{uuid}"): {
                body = await handleProductDelete(event, env)
            }

            /**
             * SITE CONFIG
             */
            /** SITE CONFIG GET */
            case ("GET /admin/site-config"): {
                body = await handleSiteConfigGet(event, env)
            }
            /** SITE CONFIG PUT */
            case ("PUT /admin/site-config"): {
                body = await handleSiteConfigPut(event, env)
            }


            default: {
                throw new TypeError(`Unknown event routeKey: ${event.httpMethod} ${event.resource || event.path}`);
            }
        }

        const response = new Response(200, JSON.stringify(body))
        console.log(`RESPONSE`, response)
        return response
    } catch (err: any) {
        console.log(`err`, err)
        return await handleError(err)
    }
}