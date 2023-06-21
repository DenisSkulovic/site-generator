"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageVersion = exports.buildPageVersion = void 0;
const buildPageVersion = (obj) => {
    if (!obj.tag)
        throw new Error("tag cannot be undefined");
    if (!obj.pagePath)
        throw new Error("pagePath cannot be undefined");
    if (!obj.configUUID)
        throw new Error("configUUID cannot be undefined");
    if (!obj.contentUUID)
        throw new Error("contentUUID cannot be undefined");
    if (!obj.createdTimestamp)
        throw new Error("createdTimestamp cannot be undefined");
    if (!obj.updatedTimestamp)
        throw new Error("updatedTimestamp cannot be undefined");
    const pageVersion = new PageVersion(obj.tag, obj.pagePath, obj.configUUID, obj.contentUUID, obj.createdTimestamp);
    return pageVersion;
};
exports.buildPageVersion = buildPageVersion;
class PageVersion {
    constructor(tag, pagePath, configUUID, contentUUID, createdTimestamp) {
        this.tag = tag;
        this.pagePath = pagePath;
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
        this.createdTimestamp = createdTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.PageVersion = PageVersion;
//# sourceMappingURL=PageVersion.js.map