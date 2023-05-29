"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterHTMLMetadata = exports.buildFooterHTMLMetadata = void 0;
const buildFooterHTMLMetadata = (obj) => {
    if (obj.clazz !== "FooterHTMLMetadata")
        throw new Error("clazz cannot be anything other than 'FooterHTMLMetadata'");
    const footerHTMLMetadata = new FooterHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return footerHTMLMetadata;
};
exports.buildFooterHTMLMetadata = buildFooterHTMLMetadata;
class FooterHTMLMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.FooterHTMLMetadata = FooterHTMLMetadata;
//# sourceMappingURL=FooterHTMLMetadata.js.map