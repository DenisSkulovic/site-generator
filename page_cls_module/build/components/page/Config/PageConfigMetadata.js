"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageConfigMetadata = exports.buildPageConfigMetadata = void 0;
const buildPageConfigMetadata = (obj) => {
    if (obj.clazz !== "PageConfigMetadata")
        throw new Error("clazz cannot be anything other than 'PageConfigMetadata'");
    const pageConfigMetadata = new PageConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return pageConfigMetadata;
};
exports.buildPageConfigMetadata = buildPageConfigMetadata;
class PageConfigMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.PageConfigMetadata = PageConfigMetadata;
//# sourceMappingURL=PageConfigMetadata.js.map