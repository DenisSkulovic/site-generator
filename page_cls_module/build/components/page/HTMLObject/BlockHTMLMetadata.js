"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHTMLMetadata = exports.buildBlockHTMLMetadata = void 0;
const buildBlockHTMLMetadata = (obj) => {
    if (obj.clazz !== "BlockHTMLMetadata")
        throw new Error("clazz cannot be anything other than 'BlockHTMLMetadata'");
    const blockHTMLMetadata = new BlockHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return blockHTMLMetadata;
};
exports.buildBlockHTMLMetadata = buildBlockHTMLMetadata;
class BlockHTMLMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.BlockHTMLMetadata = BlockHTMLMetadata;
//# sourceMappingURL=BlockHTMLMetadata.js.map