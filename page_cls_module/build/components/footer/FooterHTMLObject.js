"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterHTMLObject = exports.buildFooterHTMLObject = void 0;
const FooterHTMLMetadata_1 = require("./FooterHTMLMetadata");
const buildFooterHTMLObject = (obj) => {
    if (obj.clazz !== "FooterHTMLObject")
        throw new Error("clazz cannot be anything other than 'FooterHTMLObject'");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const metadata = (0, FooterHTMLMetadata_1.buildFooterHTMLMetadata)(obj.metadata);
    const headerHTMLObject = new FooterHTMLObject(obj.uuid, obj.html, metadata);
    return headerHTMLObject;
};
exports.buildFooterHTMLObject = buildFooterHTMLObject;
class FooterHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.FooterHTMLObject = FooterHTMLObject;
//# sourceMappingURL=FooterHTMLObject.js.map