"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapIncomingMessageToContext = exports.mapIncomingMessageToAPIGatewayEventV2 = exports.mapIncomingMessageToAPIGatewayEvent = void 0;
const routeConfig_1 = __importDefault(require("./routeConfig"));
class TfContext {
    constructor() {
        this.callbackWaitsForEmptyEventLoop = false;
        this.functionName = 'placeholder';
        this.functionVersion = 'placeholder';
        this.invokedFunctionArn = 'placeholder';
        this.memoryLimitInMB = 'placeholder';
        this.awsRequestId = 'placeholder';
        this.logGroupName = 'placeholder';
        this.logStreamName = 'placeholder';
        this.identity = undefined;
        this.clientContext = undefined;
        // Unclear what behavior this is supposed to have, I couldn't find any still extant reference,
        // and it behaves like the above, ignoring the object parameter.
        /** @deprecated Use handler callback or promise result */
    }
    getRemainingTimeInMillis() {
        return 9999999999;
    }
    /** @deprecated Use handler callback or promise result */
    done(error, result) { }
    ;
    /** @deprecated Use handler callback with first argument or reject a promise result */
    fail(error) { }
    ;
    /** @deprecated Use handler callback with second argument or resolve a promise result */
    succeed(messageOrObject) { }
    ;
}
const mapIncomingMessageHeadersToAWSHeaders = (req) => {
    // header objects should be the same, the only exception is that AWS does not support multivalue headers, so checking for it
    Object.entries(req.headers).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            throw new Error(`multivalue headers are not supported; HEADER: ${key}`);
        }
    });
    return req.headers;
};
const getAWSQueryParamsFromQueryString = (queryString) => {
    const obj = {};
    if (!queryString)
        return obj;
    const splitted = queryString.split("&");
    splitted.forEach((pairString) => {
        const [key, value] = pairString.split("=");
        obj[key] = value;
    });
    return obj;
};
const getConfigForPath = (path) => {
    for (const [pattern, config] of Object.entries(routeConfig_1.default)) {
        const regex = new RegExp(pattern);
        if (path.match(regex))
            return [pattern, config];
    }
    throw new Error(`route config for path: "${path}" not found`);
};
const getPathParameters = (path, pattern, config) => {
    const obj = {};
    if (!config.pathParameters)
        return obj;
    const match = path.match(pattern);
    if (!match && config.pathParameters && config.pathParameters.length > 0)
        throw new Error("match in 'getPathParameters' cannot be undefined");
    if (!match)
        return obj;
    config.pathParameters.forEach((pathParamName, pathParamName_i) => {
        obj[pathParamName] = match[pathParamName_i + 1];
    });
    return obj;
};
const mapIncomingMessageToAPIGatewayEvent = (req, body) => {
    if (!req.method)
        throw new Error("method cannot be undefined");
    if (!req.url)
        throw new Error("url cannot be undefined");
    let path = "";
    let queryString = "";
    if (req.url.indexOf("?") !== -1) {
        [path, queryString] = req.url.split("?");
    }
    else {
        path = req.url;
    }
    console.log(`NODEMON :>> ${req.method} ${path}`);
    const headers = mapIncomingMessageHeadersToAWSHeaders(req);
    const [pattern, routeConfig] = getConfigForPath(path);
    const pathParameters = getPathParameters(path, pattern, routeConfig);
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
        isBase64Encoded: false
    };
};
exports.mapIncomingMessageToAPIGatewayEvent = mapIncomingMessageToAPIGatewayEvent;
const mapIncomingMessageToAPIGatewayEventV2 = (req, body) => {
    if (!req.method)
        throw new Error("method cannot be undefined");
    if (!req.url)
        throw new Error("url cannot be undefined");
    let path = "";
    let queryString = "";
    if (req.url.indexOf("?") !== -1) {
        [path, queryString] = req.url.split("?");
    }
    else {
        path = req.url;
    }
    console.log(`NODEMON :>> ${req.method} ${path}`);
    const headers = mapIncomingMessageHeadersToAWSHeaders(req);
    const [pattern, routeConfig] = getConfigForPath(path);
    const pathParameters = getPathParameters(path, pattern, routeConfig);
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
            domainName: "zewv3xtbhfpwitngwhipj6bwga0bwpfj.lambda-url.eu-west-3.on.aws",
            domainPrefix: "zewv3xtbhfpwitngwhipj6bwga0bwpfj",
            http: {
                method: req.method,
                path,
                protocol: "HTTP/1.1",
                sourceIp: "35.181.36.202",
                userAgent: "PostmanRuntime/7.28.4",
            },
            requestId: "802639e0-c799-46f7-bca7-ad6f14d98728",
            routeKey: routeConfig.routeKey || "",
            stage: "$default",
            time: "02/Nov/2022:22:45:35 +0000",
            timeEpoch: 1667429135999, // TODO
        },
        body,
        isBase64Encoded: false,
    };
};
exports.mapIncomingMessageToAPIGatewayEventV2 = mapIncomingMessageToAPIGatewayEventV2;
const mapIncomingMessageToContext = (req) => {
    return new TfContext();
};
exports.mapIncomingMessageToContext = mapIncomingMessageToContext;
//# sourceMappingURL=mapIncomingMessageToAPIGatewayEventV2.js.map