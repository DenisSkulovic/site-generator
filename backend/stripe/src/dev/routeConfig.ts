
export type RouteConfigEntry = {
    routeKey: string,
    pathParameters?: Array<string>
}

export type RouteConfig = {
    [regex: string]: RouteConfigEntry
}

const routeConfig: RouteConfig = {

    /** AUTHENTICATION */
    // login
    "^\/admin\/login$": {
        routeKey: "/login",
        pathParameters: [],
    },


    /** PRODUCT MANAGEMENT */
    // all
    "^\/admin\/product\/all$": {
        routeKey: "/product",
        pathParameters: [],
    },
    // by id
    "^\/admin\/product\/([^\/]+)$": {
        routeKey: "/product/{product_id}",
        pathParameters: [],
    },


    /** CONTENT MANAGEMENT */
    // image uploading
    "^\/admin\/content\/image$": {
        routeKey: "/upload-image",
        pathParameters: [],
    },
    // page text localization
    "^\/admin\/page-content\/$": {
        routeKey: "/upload-image",
        pathParameters: [],
    },
    
    // PAGE GENERATION CONTROLS
    "^\/admin\/page-management\/([^\/]+)\/generate$": {
        routeKey: "/page-management/{page_name}/generate",
        pathParameters: ["page_name"],
    },
    "^\/admin\/page-management\/([^\/]+)\/page-config$": {
        routeKey: "/page-management/{page_name}/page-config",
        pathParameters: ["page_name"],
    },
    // header and footer config
    "^\/admin\/page-management\/header-footer-config$": {
        routeKey: "/page-management/header-footer-config",
        pathParameters: [],
    },

}

export default routeConfig