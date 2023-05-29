import { APIGatewayProxyCallbackV2, APIGatewayProxyResult, Context } from "aws-lambda";
/**
 *
 * @param event
 * @param context
 * @param callback
 * @returns
 */
export declare const handler: (event: import("aws-lambda").APIGatewayProxyEvent, context: Context, callback?: APIGatewayProxyCallbackV2) => Promise<APIGatewayProxyResult>;
