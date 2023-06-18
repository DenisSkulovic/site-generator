import {
    APIGatewayProxyEventHeaders,
    APIGatewayProxyEventV2,
    APIGatewayProxyEvent,
    APIGatewayProxyEventQueryStringParameters,
    Context,
    ClientContext,
    CognitoIdentity,
} from "aws-lambda";
import * as http from "node:http";
import routeConfig, { RouteConfigEntry } from "./routeConfig"

class TfContext implements Context { // TODO make a proper context, this is just filler
    callbackWaitsForEmptyEventLoop: boolean = false;
    functionName: string = 'placeholder';
    functionVersion: string = 'placeholder';
    invokedFunctionArn: string = 'placeholder';
    memoryLimitInMB: string = 'placeholder';
    awsRequestId: string = 'placeholder';
    logGroupName: string = 'placeholder';
    logStreamName: string = 'placeholder';
    identity?: CognitoIdentity | undefined = undefined;
    clientContext?: ClientContext | undefined = undefined;
    getRemainingTimeInMillis(): number {
        return 9999999999
    }
    /** @deprecated Use handler callback or promise result */
    done(error?: Error, result?: any): void { };
    /** @deprecated Use handler callback with first argument or reject a promise result */
    fail(error: Error | string): void { };
    /** @deprecated Use handler callback with second argument or resolve a promise result */
    succeed(messageOrObject: any): void { };
    // Unclear what behavior this is supposed to have, I couldn't find any still extant reference,
    // and it behaves like the above, ignoring the object parameter.
    /** @deprecated Use handler callback or promise result */
}

const mapIncomingMessageHeadersToAWSHeaders = (req: http.IncomingMessage): [APIGatewayProxyEventHeaders, boolean] => {
    // header objects should be the same, the only exception is that AWS does not support multivalue headers, so checking for it
    let isBase64Encoded = false;
    Object.entries(req.headers).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            throw new Error(`multivalue headers are not supported; HEADER: ${key}`)
        }
        if (key.toLowerCase() === 'content-transfer-encoding' && value === 'base64') {
            isBase64Encoded = true;
        }
    })
    console.log(`isBase64Encoded`, isBase64Encoded)
    return [req.headers as APIGatewayProxyEventHeaders, isBase64Encoded];
}


const getAWSQueryParamsFromQueryString = (queryString: string): APIGatewayProxyEventQueryStringParameters => {
    const obj: APIGatewayProxyEventQueryStringParameters = {}
    if (!queryString) return obj
    const splitted = queryString.split("&")
    splitted.forEach((pairString: string) => {
        const [key, value] = pairString.split("=")
        obj[key] = value
    })
    return obj
}


const getConfigForPath = (path: string): [string, RouteConfigEntry] => {
    for (const [pattern, config] of Object.entries(routeConfig)) {
        const regex = new RegExp(pattern)
        if (path.match(regex)) return [pattern, config]
    }
    throw new Error(`route config for path: "${path}" not found`)
}

const getPathParameters = (path: string, pattern: string, config: RouteConfigEntry) => {
    const obj: { [key: string]: string } = {}
    if (!config.pathParameters) return obj
    const match = path.match(pattern)
    if (!match && config.pathParameters && config.pathParameters.length > 0) throw new Error("match in 'getPathParameters' cannot be undefined")
    if (!match) return obj
    config.pathParameters.forEach((pathParamName: string, pathParamName_i: number) => {
        obj[pathParamName] = match[pathParamName_i + 1]
    })
    return obj
}


export const mapIncomingMessageToAPIGatewayEvent = (req: http.IncomingMessage, body: string): APIGatewayProxyEvent => {
    if (!req.method) throw new Error("method cannot be undefined")
    if (!req.url) throw new Error("url cannot be undefined")
    let path: string = ""
    let queryString: string = ""
    if (req.url.indexOf("?") !== -1) {
        [path, queryString] = req.url.split("?")
    } else {
        path = req.url
    }
    console.log(`NODEMON :>> ${req.method} ${path}`)

    const [headers, isBase64Encoded] = mapIncomingMessageHeadersToAWSHeaders(req)

    const [pattern, routeConfig] = getConfigForPath(path)
    const pathParameters = getPathParameters(path, pattern, routeConfig)

    return {
        resource: routeConfig.routeKey || "",
        path,
        httpMethod: req.method,
        headers,
        multiValueHeaders: {},
        queryStringParameters: getAWSQueryParamsFromQueryString(queryString),
        multiValueQueryStringParameters: {},
        pathParameters,
        stageVariables: null,
        requestContext: {
            routeKey: "",
            resourceId: 's991d3',
            resourcePath: '',
            httpMethod: req.method,
            extendedRequestId: 'eGywDGfzCGYFddg=',
            requestTime: '02/Jan/2023:08:38:24 +0000',
            path,
            accountId: '978349425014',
            protocol: 'HTTP/1.1',
            stage: 'dev',
            domainPrefix: 'api',
            requestTimeEpoch: 1672648704184,
            requestId: '0f0ff5ea-b716-40c8-a27b-a5cb8ccf37d7',
            identity: {
                cognitoIdentityPoolId: null,
                accountId: null,
                cognitoIdentityId: null,
                caller: null,
                sourceIp: '',
                principalOrgId: null,
                accessKey: null,
                cognitoAuthenticationType: null,
                cognitoAuthenticationProvider: null,
                userArn: null,
                userAgent: '',
                user: null,
                apiKey: null,
                apiKeyId: null,
                clientCert: null,
            },
            authorizer: null,
            domainName: '',
            apiId: 'm8rae50asl'
        },
        body,
        isBase64Encoded: isBase64Encoded
    };
}

export const mapIncomingMessageToAPIGatewayEventV2 = (req: http.IncomingMessage, body: string): APIGatewayProxyEventV2 => {
    if (!req.method) throw new Error("method cannot be undefined")
    if (!req.url) throw new Error("url cannot be undefined")
    let path: string = ""
    let queryString: string = ""
    if (req.url.indexOf("?") !== -1) {
        [path, queryString] = req.url.split("?")
    } else {
        path = req.url
    }
    console.log(`NODEMON :>> ${req.method} ${path}`)

    const [headers, isBase64Encoded] = mapIncomingMessageHeadersToAWSHeaders(req)

    const [pattern, routeConfig] = getConfigForPath(path)
    const pathParameters = getPathParameters(path, pattern, routeConfig)

    return {
        version: "2.0",
        routeKey: routeConfig.routeKey || "",
        rawPath: path,
        rawQueryString: queryString,
        headers,
        queryStringParameters: getAWSQueryParamsFromQueryString(queryString),
        pathParameters: pathParameters,
        requestContext: {
            accountId: "anonymous",
            apiId: "zewv3xtbhfpwitngwhipj6bwga0bwpfj",
            domainName:
                "zewv3xtbhfpwitngwhipj6bwga0bwpfj.lambda-url.eu-west-3.on.aws",
            domainPrefix: "zewv3xtbhfpwitngwhipj6bwga0bwpfj",
            http: {
                method: req.method,
                path,
                protocol: "HTTP/1.1",
                sourceIp: "35.181.36.202",
                userAgent: "PostmanRuntime/7.28.4",
            },
            requestId: "802639e0-c799-46f7-bca7-ad6f14d98728", // TODO use something random like UUID
            routeKey: routeConfig.routeKey || "",
            stage: "$default",
            time: "02/Nov/2022:22:45:35 +0000", // TODO
            timeEpoch: 1667429135999, // TODO
        },
        body,
        isBase64Encoded: isBase64Encoded,
    };
}

export const mapIncomingMessageToContext = (req: http.IncomingMessage): Context => {
    return new TfContext()
}
