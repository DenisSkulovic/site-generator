
export type RouteConfigEntry = {
    routeKey: string,
    pathParameters?: Array<string>
}

export type RouteConfig = {
    [regex: string]: RouteConfigEntry
}

const routeConfig: RouteConfig = {

    "^\/page-generator\/generate-header$": {
        routeKey: "/generate-header",
        pathParameters: [],
    },

    "^\/page-generator\/generate-footer$": {
        routeKey: "/generate-footer",
        pathParameters: [],
    },

    "^\/page-generator\/generate-page$": {
        routeKey: "/generate-page",
        pathParameters: [],
    },

    "^\/page-generator\/generate-area$": {
        routeKey: "/generate-area",
        pathParameters: [],
    },

    "^\/page-generator\/generate-block$": {
        routeKey: "/generate-block",
        pathParameters: [],
    },


}

export default routeConfig