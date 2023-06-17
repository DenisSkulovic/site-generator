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
    "^/regenerate-footer$": {
        routeKey: "/regenerate-footer",
        pathParameters: [],
    },
    "^/get-footer$": {
        routeKey: "/get-footer",
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
    "^/regenerate-header$": {
        routeKey: "/regenerate-header",
        pathParameters: [],
    },
    "^/get-header$": {
        routeKey: "/get-header",
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
    "^/page-config$": {
        routeKey: "/page-config",
        pathParameters: [],
    },

    /** PAGE CONTENT */
    "^/page-content/([^/]+)$": {
        routeKey: "/page-content/{uuid}",
        pathParameters: ["uuid"],
    },
    "^/page-content$": {
        routeKey: "/page-content",
        pathParameters: [],
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

    /** PAGEMETA */
    "^/pagemeta/all$": {
        routeKey: "/pagemeta/all",
        pathParameters: [],
    },
    "^/pagemeta": {
        routeKey: "/pagemeta",
        pathParameters: [],
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
