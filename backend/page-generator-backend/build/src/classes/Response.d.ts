import { APIGatewayProxyResult } from "aws-lambda";
declare class Response implements APIGatewayProxyResult {
    statusCode: number;
    body: string;
    headers?: {
        [header: string]: boolean | number | string;
    } | undefined;
    constructor(statusCode: number, body: string, additionalHeaders?: {
        [header: string]: boolean | number | string;
    });
}
export default Response;
