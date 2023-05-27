"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterHTMLObject = exports.buildFooterHTMLObject = void 0;
const FooterHTMLMetadata_1 = require("./FooterHTMLMetadata");
const FooterContent_1 = require("./FooterContent");
const FooterConfig_1 = require("./FooterConfig");
const buildFooterHTMLObject = (obj) => {
    if (obj.clazz !== "FooterHTMLObject")
        throw new Error("clazz cannot be anything other than 'FooterHTMLObject'");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const content = (0, FooterContent_1.buildFooterContent)(obj.content);
    const config = (0, FooterConfig_1.buildFooterConfig)(obj.config);
    const metadata = (0, FooterHTMLMetadata_1.buildFooterHTMLMetadata)(obj.metadata);
    const headerHTMLObject = new FooterHTMLObject(obj.uuid, obj.html, content, config, metadata);
    return headerHTMLObject;
};
exports.buildFooterHTMLObject = buildFooterHTMLObject;
class FooterHTMLObject {
    constructor(uuid, html, content, config, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.content = content;
        this.config = config;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.FooterHTMLObject = FooterHTMLObject;
//# sourceMappingURL=FooterHTMLObject.js.map