"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHTMLMetadata = exports.buildAreaHTMLMetadata = void 0;
const __1 = require("../../../");
const buildAreaHTMLMetadata = (obj) => {
    const metadata = new AreaHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildAreaHTMLMetadata = buildAreaHTMLMetadata;
class AreaHTMLMetadata extends __1.Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
exports.AreaHTMLMetadata = AreaHTMLMetadata;
//# sourceMappingURL=AreaHTMLMetadata.js.map