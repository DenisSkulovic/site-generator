"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterConfigMetadata = exports.buildFooterConfigMetadata = void 0;
const buildFooterConfigMetadata = (obj) => {
    if (obj.clazz !== "FooterConfigMetadata")
        throw new Error("clazz cannot be anything other than 'FooterConfigMetadata'");
    const footerConfigMetadata = new FooterConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return footerConfigMetadata;
};
exports.buildFooterConfigMetadata = buildFooterConfigMetadata;
class FooterConfigMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.FooterConfigMetadata = FooterConfigMetadata;
//# sourceMappingURL=FooterConfigMetadata.js.map