import { SiteConfig } from "./";
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export const createSiteConfig = ({}) => new SiteConfig();
export function createPagemetaMetadata(params = {}) {
    const defaultMetadata = {
        createdTimestamp: Date.now(),
        updatedTimestamp: Date.now(),
        clazz: 'PagemetaMetadata'
    };
    return { ...defaultMetadata, ...params };
}
export function createPagemeta(params = {}) {
    const defaultPagemeta = {
        path: '/default/path',
        s3Path: '/s3Path/default/path',
        s3Link: '/s3Link/default/path',
        versionTag: guid(),
        isPublished: false,
        metadata: createPagemetaMetadata({}),
        clazz: "Pagemeta",
    };
    return { ...defaultPagemeta, ...params };
}
//# sourceMappingURL=mockFactories.js.map