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
import buildValidateRequest from "./logic/builders/buildValidateRequest"
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
             * GET CONFIG
            */
            case ("GET /promo/fnac-darty/config"): {
                const res: DTO.PromocodeConfig = await handleGetConfig()
                body = res;
                break;
            }

            /**
             * VALIDATE
             */
            case ("POST /promo/fnac-darty/validate"): {
                const requestBody = JSON.parse(event.body || "")
                const request: DTO.FnacDartyValidateRequest = buildValidateRequest(requestBody)
                const res: {isValid: boolean} = await handleValidate(request)
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