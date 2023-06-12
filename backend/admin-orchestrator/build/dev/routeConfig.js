"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeConfig = {
    /** AUTHENTICATION */
    // login
    "^/admin/auth/login$": {
        routeKey: "/auth/login",
        pathParameters: [],
    },
    // refresh
    "^/admin/auth/refresh$": {
        routeKey: "/auth/refresh",
        pathParameters: [],
    },
    /** CLOUDFRONT */
    "^/admin/cloudfront/invalidate$": {
        routeKey: "/cloudfront/invalidate",
        pathParameters: [],
    },
    /** FOOTER */
    "^/admin/footer-config$": {
        routeKey: "/footer-config",
        pathParameters: [],
    },
    "^/admin/footer-content$": {
        routeKey: "/footer-content",
        pathParameters: [],
    },
    /** HEADER */
    "^/admin/header-config$": {
        routeKey: "/header-config",
        pathParameters: [],
    },
    "^/admin/header-content$": {
        routeKey: "/header-content",
        pathParameters: [],
    },
    /** IMAGE */
    "^/admin/image/([^/]+)$": {
        routeKey: "/image/{key}",
        pathParameters: ["key"],
    },
    /** PAGE CONFIG */
    "^/admin/page-config/([^/]+)$": {
        routeKey: "/page-config/{uuid}",
        pathParameters: ["uuid"],
    },
    /** PAGE CONTENT */
    "^/admin/page-content/([^/]+)$": {
        routeKey: "/page-content/{uuid}",
        pathParameters: ["uuid"],
    },
    /** PAGE GENERATOR */
    "^/admin/page-generator/footer$": {
        routeKey: "/page-generator/footer",
        pathParameters: [],
    },
    "^/admin/page-generator/header$": {
        routeKey: "/page-generator/header",
        pathParameters: [],
    },
    "^/admin/page-generator/page$": {
        routeKey: "/page-generator/page",
        pathParameters: [],
    },
    /** PAGE HTML OBJECTS */
    "^/admin/page-html-object/all$": {
        routeKey: "/page-html-object/all",
        pathParameters: [],
    },
    "^/admin/page-html-object/([^/]+)$": {
        routeKey: "/page-html-object/{key}",
        pathParameters: ["key"],
    },
    /** PAGES */
    "^/admin/page-s3$": {
        routeKey: "/page-s3",
        pathParameters: [],
    },
    "^/admin/page-s3/([^/]+)$": {
        routeKey: "/page-s3/{key}",
        pathParameters: ["key"],
    },
    /** PRODUCT */
    "^/admin/product/all$": {
        routeKey: "/product/all",
        pathParameters: [],
    },
    "^/admin/product/([^/]+)$": {
        routeKey: "/product/{uuid}",
        pathParameters: ["uuid"],
    },
    /** SITE CONFIG */
    "^/admin/site-config$": {
        routeKey: "/site-config",
        pathParameters: [],
    },
    "^/admin/design-system$": {
        routeKey: "/design-system",
        pathParameters: [],
    },
    /** PAGE ASSETS */
    "^/admin/page-assets$": {
        routeKey: "/page-assets",
        pathParameters: [],
    },
};
exports.default = routeConfig;
//# sourceMappingURL=routeConfig.js.map