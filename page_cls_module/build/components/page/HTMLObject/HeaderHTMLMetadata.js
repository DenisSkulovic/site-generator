"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderHTMLMetadata = exports.buildHeaderHTMLMetadata = void 0;
const buildHeaderHTMLMetadata = (obj) => {
    if (obj.clazz !== "HeaderHTMLMetadata")
        throw new Error("clazz cannot be anything other than 'HeaderHTMLMetadata'");
    const headerHTMLMetadata = new HeaderHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return headerHTMLMetadata;
};
exports.buildHeaderHTMLMetadata = buildHeaderHTMLMetadata;
class HeaderHTMLMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.HeaderHTMLMetadata = HeaderHTMLMetadata;
//# sourceMappingURL=HeaderHTMLMetadata.js.map