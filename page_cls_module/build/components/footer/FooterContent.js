"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterContent = exports.buildFooterContent = void 0;
const FooterContentMetadata_1 = require("./FooterContentMetadata");
const buildFooterContent = (obj) => {
    if (obj.clazz !== "FooterContent")
        throw new Error("clazz cannot be anything other than 'FooterContent'");
    const metadata = (0, FooterContentMetadata_1.buildFooterContentMetadata)(obj.metadata);
    const footerContent = new FooterContent(obj.uuid, metadata);
    return footerContent;
};
exports.buildFooterContent = buildFooterContent;
class FooterContent {
    constructor(uuid, metadata) {
        this.uuid = uuid;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.FooterContent = FooterContent;
//# sourceMappingURL=FooterContent.js.map