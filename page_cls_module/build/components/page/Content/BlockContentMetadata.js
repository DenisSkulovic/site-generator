"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockContentMetadata = exports.buildBlockContentMetadata = void 0;
const __1 = require("../../../");
const buildBlockContentMetadata = (obj) => {
    const metadata = new BlockContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildBlockContentMetadata = buildBlockContentMetadata;
class BlockContentMetadata extends __1.Metadata {
}
exports.BlockContentMetadata = BlockContentMetadata;
//# sourceMappingURL=BlockContentMetadata.js.map