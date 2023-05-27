"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContentMetadata = exports.buildPageContentMetadata = void 0;
const buildPageContentMetadata = (obj) => {
    if (obj.clazz !== "PageContentMetadata")
        throw new Error("clazz cannot be anything other than 'PageContentMetadata'");
    const metadata = new PageContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildPageContentMetadata = buildPageContentMetadata;
class PageContentMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.PageContentMetadata = PageContentMetadata;
//# sourceMappingURL=PageContentMetadata.js.map