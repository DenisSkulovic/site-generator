"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHTMLObject = exports.buildPageHTMLObject = void 0;
const PageConfig_1 = require("../Config/PageConfig");
const PageHTMLMetadata_1 = require("./PageHTMLMetadata");
const PageContent_1 = require("../Content/PageContent");
const buildPageHTMLObject = (obj) => {
    if (obj.clazz !== "PageHTMLObject")
        throw new Error("clazz cannot be anything other than 'PageHTMLObject'");
    const config = (0, PageConfig_1.buildPageConfig)(obj.config);
    const pageHTMLMetadata = (0, PageHTMLMetadata_1.buildPageHTMLMetadata)(obj.metadata);
    const content = (0, PageContent_1.buildPageContent)(obj.content);
    const pageHTMLObject = new PageHTMLObject(obj.uuid, obj.html, config, content, pageHTMLMetadata);
    return pageHTMLObject;
};
exports.buildPageHTMLObject = buildPageHTMLObject;
class PageHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.PageHTMLObject = PageHTMLObject;
//# sourceMappingURL=PageHTMLObject.js.map