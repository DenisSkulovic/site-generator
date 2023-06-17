"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHTMLObject = exports.buildBlockHTMLObject = void 0;
const BlockHTMLMetadata_1 = require("./BlockHTMLMetadata");
const buildBlockHTMLObject = (obj) => {
    if (obj.clazz !== "BlockHTMLObject")
        throw new Error("clazz cannot be anything other than 'BlockHTMLObject'");
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.blockMetadata)
        throw new Error("blockMetadata cannot be undefined");
    const blockHTMLMetadata = (0, BlockHTMLMetadata_1.buildBlockHTMLMetadata)(obj.blockMetadata);
    const blockHTMLObject = new BlockHTMLObject(obj.uuid, obj.html, blockHTMLMetadata);
    return blockHTMLObject;
};
exports.buildBlockHTMLObject = buildBlockHTMLObject;
class BlockHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.BlockHTMLObject = BlockHTMLObject;
//# sourceMappingURL=BlockHTMLObject.js.map