import {
    APIGatewayProxyCallbackV2,
    APIGatewayProxyResult,
    Context,
    APIGatewayEvent,
} from "aws-lambda";
import handleError from "./logic/handleError"
import Response from "./classes/Response"
import * as dotenv from "dotenv"
import handleGetConfig from "./logic/handlers/handleGetConfig"
import handleValidate from "./logic/handlers/handleValidate"
import buildValidateRequest from "./logic/buildValidateRequest"
import * as DTO from "../../../requests-module";

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

    let body: any
    const path = `${event.httpMethod} /promo${event.resource}`
    console.log(`path`, path)
    try {
        switch (path) {

            /**
             * SEARCH PAGES
             */

            /**
             * GET PAGE FROM S3
             */

            /**
             * SAVE PAGE ON S3
             */
            case ("POST /admin/pages/{page_uuid}"): {
                const requestBody = JSON.parse(event.body || "")
                const request: DTO.FnacDartyValidateRequest = buildValidateRequest(requestBody)
                const res: { isValid: boolean } = await handleValidate(request)
                body = res;
                break;
            }
            /**
             * UPDATE PAGE ON S3
             */

            /**
             * DELETE PAGE ON S3
             */
            

            /**
             * GET PAGE CONFIG
            */
            case ("GET /admin/page-config/{config_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * CREATE PAGE CONFIG
            */
            case ("POST /admin/page-config/{config_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * UPDATE PAGE CONFIG
            */
            case ("PUT /admin/page-config/{config_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * DELETE PAGE CONFIG
             */
            case ("DELETE /admin/page-config/{config_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * GET PAGE CONTENT
            */
            case ("GET /admin/page-content/{content_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * CREATE PAGE CONTENT
            */
            case ("POST /admin/page-content/{content_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * UPDATE PAGE CONTENT
            */
            case ("PUT /admin/page-content/{content_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * DELETE PAGE CONTENT
             */
            case ("DELETE /admin/page-content/{content_uuid}"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * PUBLISH PAGE
             */
            case ("GET /admin/pages/{page_uuid}/publish"): {
                const requestBody = JSON.parse(event.body || "")
                const request: DTO.FnacDartyValidateRequest = buildValidateRequest(requestBody)
                const res: { isValid: boolean } = await handleValidate(request)
                body = res;
                break;
            }

            /**
             * REMOVE PAGE
             */
            case ("GET /admin/pages/{page_uuid}/remove"): {
                const requestBody = JSON.parse(event.body || "")
                const request: DTO.FnacDartyValidateRequest = buildValidateRequest(requestBody)
                const res: { isValid: boolean } = await handleValidate(request)
                body = res;
                break;
            }

            /**
             * CLEAR CLOUDFRONT CACHE
             */
            case ("GET /admin/pages/{page_uuid}/clear-cloudfront-cache"): {
                const requestBody = JSON.parse(event.body || "")
                const request: DTO.FnacDartyValidateRequest = buildValidateRequest(requestBody)
                const res: { isValid: boolean } = await handleValidate(request)
                body = res;
                break;
            }

            /**
             * ADMIN LOGIN
             */
            case ("POST /admin/login"): {
                const requestBody = JSON.parse(event.body || "")
                const request: DTO.FnacDartyValidateRequest = buildValidateRequest(requestBody)
                const res: { isValid: boolean } = await handleValidate(request)
                body = res;
                break;
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