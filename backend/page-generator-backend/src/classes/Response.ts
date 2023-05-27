import {
    APIGatewayProxyResult,
} from "aws-lambda";
import headers from "../config/headers"

class Response implements APIGatewayProxyResult {
    statusCode: number
    body: string
    headers?: {
        [header: string]: boolean | number | string;
    } | undefined;
    constructor(
        statusCode: number,
        body: string,
        additionalHeaders?: {
            [header: string]: boolean | number | string;
        }
    ) {
        this.statusCode = statusCode
        this.body = body
        if (additionalHeaders) {
            this.headers = {...headers, ...additionalHeaders}
        } else {
            this.headers = headers
        }
    }
}

export default Response