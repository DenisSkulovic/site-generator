"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockContentMetadata = exports.buildBlockContentMetadata = void 0;
const buildBlockContentMetadata = (obj) => {
    if (obj.clazz !== "BlockContentMetadata")
        throw new Error("clazz cannot be anything other than 'BlockContentMetadata'");
    const blockContentMetadata = new BlockContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return blockContentMetadata;
};
exports.buildBlockContentMetadata = buildBlockContentMetadata;
class BlockContentMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.BlockContentMetadata = BlockContentMetadata;
//# sourceMappingURL=BlockContentMetadata.js.map