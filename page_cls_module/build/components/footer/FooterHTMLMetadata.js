"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterHTMLMetadata = exports.buildFooterHTMLMetadata = void 0;
const __1 = require("../../");
const buildFooterHTMLMetadata = (obj) => {
    const metadata = new FooterHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildFooterHTMLMetadata = buildFooterHTMLMetadata;
class FooterHTMLMetadata extends __1.Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
exports.FooterHTMLMetadata = FooterHTMLMetadata;
//# sourceMappingURL=FooterHTMLMetadata.js.map