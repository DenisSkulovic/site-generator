"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockContentMetadata = exports.buildBlockContentMetadata = void 0;
const Metadata_1 = require("src/components/Metadata");
const buildBlockContentMetadata = (obj) => {
    const metadata = new BlockContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildBlockContentMetadata = buildBlockContentMetadata;
class BlockContentMetadata extends Metadata_1.Metadata {
}
exports.BlockContentMetadata = BlockContentMetadata;
//# sourceMappingURL=BlockContentMetadata.js.map