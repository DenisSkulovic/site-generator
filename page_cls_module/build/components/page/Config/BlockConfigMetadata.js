"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockConfigMetadata = exports.buildBlockConfigMetadata = void 0;
const Metadata_1 = require("src/components/Metadata");
const buildBlockConfigMetadata = (obj) => {
    const metadata = new BlockConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildBlockConfigMetadata = buildBlockConfigMetadata;
class BlockConfigMetadata extends Metadata_1.Metadata {
}
exports.BlockConfigMetadata = BlockConfigMetadata;
//# sourceMappingURL=BlockConfigMetadata.js.map