import {
    APIGatewayProxyCallbackV2,
    APIGatewayProxyResult,
    Context,
    APIGatewayEvent,
} from "aws-lambda";
import {
    GenerateHeaderRequest,
    buildGenerateHeaderRequest,
    GenerateFooterRequest,
    buildGenerateFooterRequest,
    GeneratePageRequest,
    buildGeneratePageRequest,
    GenerateAreaRequest,
    buildGenerateAreaRequest,
    GenerateBlockRequest,
    buildGenerateBlockRequest,
    GenerateHeaderResponse,
    GenerateFooterResponse,
    GeneratePageResponse,
    GenerateAreaResponse,
    GenerateBlockResponse,
} from "@page_cls_module";
import * as dotenv from "dotenv"
import handleError from "./logic/handleError"
import Response from "./classes/Response"
import handleGenerateHeader from "./logic/handlers/handleGenerateHeader";
import handleGenerateFooter from "./logic/handlers/handleGenerateFooter";
import handleGeneratePage from "./logic/handlers/handleGeneratePage";
import handleGenerateArea from "./logic/handlers/handleGenerateArea";
import handleGenerateBlock from "./logic/handlers/handleGenerateBlock";

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
    const path = `${event.httpMethod} /page-generator${event.resource}`
    console.log(`path`, path)
    try {
        switch (path) {

            /**
             * GENERATE HEADER
            */
            case ("POST /page-generator/generate-header"): {
                const requestBody: {[key: string]: any} = JSON.parse(event.body || "{}")
                const request: GenerateHeaderRequest = buildGenerateHeaderRequest(requestBody)
                const res: GenerateHeaderResponse = await handleGenerateHeader(request)
                body = res;
                break;
            }

            /**
             * GENERATE FOOTER
             */
            case ("POST /page-generator/generate-footer"): {
                const requestBody: {[key: string]: any} = JSON.parse(event.body || "{}")
                const request: GenerateFooterRequest = buildGenerateFooterRequest(requestBody)
                const res: GenerateFooterResponse = await handleGenerateFooter(request)
                body = res;
                break;
            }

            /**
             * GENERATE PAGE
             */
            case ("POST /page-generator/generate-page"): {
                const requestBody: {[key: string]: any} = JSON.parse(event.body || "{}")
                const request: GeneratePageRequest = buildGeneratePageRequest(requestBody)
                const res: GeneratePageResponse = await handleGeneratePage(request)
                body = res;
                break;
            }

            /**
             * GENERATE AREA
             */
            case ("POST /page-generator/generate-area"): {
                const requestBody: {[key: string]: any} = JSON.parse(event.body || "{}")
                const request: GenerateAreaRequest = buildGenerateAreaRequest(requestBody)
                const res: GenerateAreaResponse = await handleGenerateArea(request)
                body = res;
                break;
            }

            /**
             * GENERATE BLOCK
             */
            case ("POST /page-generator/generate-block"): {
                const requestBody: {[key: string]: any} = JSON.parse(event.body || "{}")
                const request: GenerateBlockRequest = buildGenerateBlockRequest(requestBody)
                const res: GenerateBlockResponse = await handleGenerateBlock(request)
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