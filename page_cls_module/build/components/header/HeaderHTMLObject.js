"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderHTMLObject = exports.buildHeaderHTMLObject = void 0;
const HeaderHTMLMetadata_1 = require("./HeaderHTMLMetadata");
const buildHeaderHTMLObject = (obj) => {
    if (obj.clazz !== "HeaderHTMLObject")
        throw new Error("clazz cannot be anything other than 'HeaderHTMLObject'");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const metadata = (0, HeaderHTMLMetadata_1.buildHeaderHTMLMetadata)(obj.metadata);
    const headerHTMLObject = new HeaderHTMLObject(obj.uuid, obj.html, metadata);
    return headerHTMLObject;
};
exports.buildHeaderHTMLObject = buildHeaderHTMLObject;
class HeaderHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.HeaderHTMLObject = HeaderHTMLObject;
//# sourceMappingURL=HeaderHTMLObject.js.map