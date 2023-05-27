
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
        routeKey: "/product/all",
        pathParameters: [],
    },
    // by id
    "^\/admin\/product\/([^\/]+)$": {
        routeKey: "/product/{product_id}",
        pathParameters: ["product_id"],
    },
    // search
    "^\/admin\/product\/search$": {
        routeKey: "/product/search",
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
    // regenerate
    "^\/admin\/page-management\/([^\/]+)\/regenerate$": {
        routeKey: "/page-management/{page_name}/regenerate",
        pathParameters: ["page_name"],
    },
    // preview
    "^\/admin\/page-management\/([^\/]+)\/preview$": {
        routeKey: "/page-management/{page_name}/preview",
        pathParameters: ["page_name"],
    },

    /** PAGE AND HEADER & FOOTER CONFIG */
    // page config
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