export type RouteConfigEntry = {
    routeKey: string;
    pathParameters?: Array<string>;
};
export type RouteConfig = {
    [regex: string]: RouteConfigEntry;
};
declare const routeConfig: RouteConfig;
export default routeConfig;
