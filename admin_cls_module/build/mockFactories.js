"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPagemeta = exports.createPagemetaMetadata = exports.createSiteConfig = void 0;
const _1 = require("./");
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const createSiteConfig = ({}) => new _1.SiteConfig();
exports.createSiteConfig = createSiteConfig;
function createPagemetaMetadata(params = {}) {
    const defaultMetadata = {
        createdTimestamp: Date.now(),
        updatedTimestamp: Date.now(),
        clazz: 'PagemetaMetadata'
    };
    return { ...defaultMetadata, ...params };
}
exports.createPagemetaMetadata = createPagemetaMetadata;
function createPagemeta(params = {}) {
    const defaultPagemeta = {
        path: '/default/path',
        s3Path: '/s3Path/default/path',
        s3Link: '/s3Link/default/path',
        contentUUID: guid(),
        configUUID: guid(),
        isPublished: false,
        metadata: createPagemetaMetadata({}),
        clazz: "Pagemeta",
    };
    return { ...defaultPagemeta, ...params };
}
exports.createPagemeta = createPagemeta;
//# sourceMappingURL=mockFactories.js.map