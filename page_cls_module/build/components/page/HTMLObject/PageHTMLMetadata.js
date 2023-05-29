"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHTMLMetadata = exports.buildPageHTMLMetadata = void 0;
const buildPageHTMLMetadata = (obj) => {
    if (obj.clazz !== "PageHTMLMetadata")
        throw new Error("clazz cannot be anything other than 'PageHTMLMetadata'");
    const pageHTMLMetadata = new PageHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return pageHTMLMetadata;
};
exports.buildPageHTMLMetadata = buildPageHTMLMetadata;
class PageHTMLMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.PageHTMLMetadata = PageHTMLMetadata;
//# sourceMappingURL=PageHTMLMetadata.js.map