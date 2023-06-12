"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHTMLMetadata = exports.buildBlockHTMLMetadata = void 0;
const Metadata_1 = require("src/components/Metadata");
const buildBlockHTMLMetadata = (obj) => {
    const metadata = new BlockHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildBlockHTMLMetadata = buildBlockHTMLMetadata;
class BlockHTMLMetadata extends Metadata_1.Metadata {
}
exports.BlockHTMLMetadata = BlockHTMLMetadata;
//# sourceMappingURL=BlockHTMLMetadata.js.map