
export type RouteConfigEntry = {
    routeKey: string,
    pathParameters?: Array<string>
}

export type RouteConfig = {
    [regex: string]: RouteConfigEntry
}

const routeConfig: RouteConfig = {

    "^\/generate-header$": {
        routeKey: "/generate-header",
        pathParameters: [],
    },

    "^\/generate-footer$": {
        routeKey: "/generate-footer",
        pathParameters: [],
    },

    "^\/generate-page$": {
        routeKey: "/generate-page",
        pathParameters: [],
    },

    "^\/generate-area$": {
        routeKey: "/generate-area",
        pathParameters: [],
    },

    "^\/generate-block$": {
        routeKey: "/generate-block",
        pathParameters: [],
    },


}

export default routeConfig