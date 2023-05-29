"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockContent = exports.buildBlockContent = void 0;
const BlockContentMetadata_1 = require("./BlockContentMetadata");
const buildBlockContent = (obj) => {
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    if (obj.clazz !== "BlockContent")
        throw new Error("clazz cannot be anything other than 'BlockContent'");
    const metadata = (0, BlockContentMetadata_1.buildBlockContentMetadata)(obj.metadata);
    const blockContent = new BlockContent(obj.uuid, obj.data, metadata);
    return blockContent;
};
exports.buildBlockContent = buildBlockContent;
class BlockContent {
    constructor(uuid, data, metadata) {
        this.uuid = uuid;
        this.data = data;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.BlockContent = BlockContent;
//# sourceMappingURL=BlockContent.js.map