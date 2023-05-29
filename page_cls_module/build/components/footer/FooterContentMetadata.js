"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterContentMetadata = exports.buildFooterContentMetadata = void 0;
const buildFooterContentMetadata = (obj) => {
    if (obj.clazz !== "FooterContentMetadata")
        throw new Error("clazz cannot be anything other than 'FooterContentMetadata'");
    const footerContentMetadata = new FooterContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return footerContentMetadata;
};
exports.buildFooterContentMetadata = buildFooterContentMetadata;
class FooterContentMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.FooterContentMetadata = FooterContentMetadata;
//# sourceMappingURL=FooterContentMetadata.js.map