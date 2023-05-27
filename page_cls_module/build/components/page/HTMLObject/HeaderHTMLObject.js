"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderHTMLObject = exports.buildHeaderHTMLObject = void 0;
const HeaderConfig_1 = require("../../header/HeaderConfig");
const HeaderHTMLMetadata_1 = require("./HeaderHTMLMetadata");
const HeaderContent_1 = require("../../header/HeaderContent");
const buildHeaderHTMLObject = (obj) => {
    if (obj.clazz !== "HeaderHTMLObject")
        throw new Error("clazz cannot be anything other than 'HeaderHTMLObject'");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const config = (0, HeaderConfig_1.buildHeaderConfig)(obj.config);
    const content = (0, HeaderContent_1.buildHeaderContent)(obj.content);
    const metadata = (0, HeaderHTMLMetadata_1.buildHeaderHTMLMetadata)(obj.metadata);
    const headerHTMLObject = new HeaderHTMLObject(obj.uuid, obj.html, config, content, metadata);
    return headerHTMLObject;
};
exports.buildHeaderHTMLObject = buildHeaderHTMLObject;
class HeaderHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.HeaderHTMLObject = HeaderHTMLObject;
//# sourceMappingURL=HeaderHTMLObject.js.map