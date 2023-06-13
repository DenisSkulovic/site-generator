export type RouteConfigEntry = {
    routeKey: string,
    pathParameters?: Array<string>
}

export type RouteConfig = {
    [regex: string]: RouteConfigEntry
}

const routeConfig = {

    /** AUTHENTICATION */
    // login
    "^/auth/login$": {
        routeKey: "/auth/login",
        pathParameters: [],
    },
    // refresh
    "^/auth/refresh$": {
        routeKey: "/auth/refresh",
        pathParameters: [],
    },

    /** CLOUDFRONT */
    "^/cloudfront/invalidate$": {
        routeKey: "/cloudfront/invalidate",
        pathParameters: [],
    },

    /** FOOTER */
    "^/footer-config$": {
        routeKey: "/footer-config",
        pathParameters: [],
    },
    "^/footer-content$": {
        routeKey: "/footer-content",
        pathParameters: [],
    },

    /** HEADER */
    "^/header-config$": {
        routeKey: "/header-config",
        pathParameters: [],
    },
    "^/header-content$": {
        routeKey: "/header-content",
        pathParameters: [],
    },

    /** IMAGE */
    "^/image/([^/]+)$": {
        routeKey: "/image/{key}",
        pathParameters: ["key"],
    },

    /** PAGE CONFIG */
    "^/page-config/([^/]+)$": {
        routeKey: "/page-config/{uuid}",
        pathParameters: ["uuid"],
    },

    /** PAGE CONTENT */
    "^/page-content/([^/]+)$": {
        routeKey: "/page-content/{uuid}",
        pathParameters: ["uuid"],
    },

    /** PAGE GENERATOR */
    "^/page-generator/footer$": {
        routeKey: "/page-generator/footer",
        pathParameters: [],
    },
    "^/page-generator/header$": {
        routeKey: "/page-generator/header",
        pathParameters: [],
    },
    "^/page-generator/page$": {
        routeKey: "/page-generator/page",
        pathParameters: [],
    },

    /** PAGE HTML OBJECTS */
    "^/page-html-object/all$": {
        routeKey: "/page-html-object/all",
        pathParameters: [],
    },
    "^/page-html-object/([^/]+)$": {
        routeKey: "/page-html-object/{key}",
        pathParameters: ["key"],
    },

    /** PAGES */
    "^/page-s3$": {
        routeKey: "/page-s3",
        pathParameters: [],
    },
    "^/page-s3/([^/]+)$": {
        routeKey: "/page-s3/{key}",
        pathParameters: ["key"],
    },

    /** PRODUCT */
    "^/product/all$": {
        routeKey: "/product/all",
        pathParameters: [],
    },
    "^/product/([^/]+)$": {
        routeKey: "/product/{uuid}",
        pathParameters: ["uuid"],
    },

    /** SITE CONFIG */
    "^/site-config$": {
        routeKey: "/site-config",
        pathParameters: [],
    },
    "^/design-system$": {
        routeKey: "/design-system",
        pathParameters: [],
    },

    /** PAGE ASSETS */
    "^/page-assets$": {
        routeKey: "/page-assets",
        pathParameters: [],
    },
}

export default routeConfig;
