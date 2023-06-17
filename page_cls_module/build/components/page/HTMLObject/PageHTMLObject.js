"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHTMLObject = exports.buildPageHTMLObject = void 0;
const PageHTMLMetadata_1 = require("./PageHTMLMetadata");
const buildPageHTMLObject = (obj) => {
    if (obj.clazz !== "PageHTMLObject")
        throw new Error("clazz cannot be anything other than 'PageHTMLObject'");
    const pageHTMLMetadata = (0, PageHTMLMetadata_1.buildPageHTMLMetadata)(obj.metadata);
    const pageHTMLObject = new PageHTMLObject(obj.uuid, obj.html, pageHTMLMetadata);
    return pageHTMLObject;
};
exports.buildPageHTMLObject = buildPageHTMLObject;
class PageHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.PageHTMLObject = PageHTMLObject;
//# sourceMappingURL=PageHTMLObject.js.map