"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderHTMLMetadata = exports.buildHeaderHTMLMetadata = void 0;
const __1 = require("../..");
const buildHeaderHTMLMetadata = (obj) => {
    const metadata = new HeaderHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildHeaderHTMLMetadata = buildHeaderHTMLMetadata;
class HeaderHTMLMetadata extends __1.Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
exports.HeaderHTMLMetadata = HeaderHTMLMetadata;
//# sourceMappingURL=HeaderHTMLMetadata.js.map