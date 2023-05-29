import { APIGatewayProxyEventV2, APIGatewayProxyEvent, Context } from "aws-lambda";
import * as http from "node:http";
export declare const mapIncomingMessageToAPIGatewayEvent: (req: http.IncomingMessage, body: string) => APIGatewayProxyEvent;
export declare const mapIncomingMessageToAPIGatewayEventV2: (req: http.IncomingMessage, body: string) => APIGatewayProxyEventV2;
export declare const mapIncomingMessageToContext: (req: http.IncomingMessage) => Context;
