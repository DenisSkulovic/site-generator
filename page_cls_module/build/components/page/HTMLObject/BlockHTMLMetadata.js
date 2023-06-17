"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHTMLMetadata = exports.buildBlockHTMLMetadata = void 0;
const __1 = require("../../../");
const buildBlockHTMLMetadata = (obj) => {
    const metadata = new BlockHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildBlockHTMLMetadata = buildBlockHTMLMetadata;
class BlockHTMLMetadata extends __1.Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
exports.BlockHTMLMetadata = BlockHTMLMetadata;
//# sourceMappingURL=BlockHTMLMetadata.js.map