"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHTMLMetadata = exports.buildPageHTMLMetadata = void 0;
const __1 = require("../../../");
const buildPageHTMLMetadata = (obj) => {
    const metadata = new PageHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildPageHTMLMetadata = buildPageHTMLMetadata;
class PageHTMLMetadata extends __1.Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
exports.PageHTMLMetadata = PageHTMLMetadata;
//# sourceMappingURL=PageHTMLMetadata.js.map