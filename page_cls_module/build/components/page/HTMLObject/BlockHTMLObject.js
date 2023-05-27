"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHTMLObject = exports.buildBlockHTMLObject = void 0;
const BlockHTMLMetadata_1 = require("./BlockHTMLMetadata");
const BlockConfig_1 = require("../Config/BlockConfig");
const BlockContent_1 = require("../Content/BlockContent");
const buildBlockHTMLObject = (obj) => {
    if (obj.clazz !== "BlockHTMLObject")
        throw new Error("clazz cannot be anything other than 'BlockHTMLObject'");
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.config)
        throw new Error("config cannot be undefined");
    if (!obj.blockMetadata)
        throw new Error("blockMetadata cannot be undefined");
    if (!obj.content)
        throw new Error("content cannot be undefined");
    const config = (0, BlockConfig_1.buildBlockConfig)(obj.config);
    const blockHTMLMetadata = (0, BlockHTMLMetadata_1.buildBlockHTMLMetadata)(obj.blockMetadata);
    const content = (0, BlockContent_1.buildBlockContent)(obj.content);
    const blockHTMLObject = new BlockHTMLObject(obj.uuid, obj.html, config, content, blockHTMLMetadata);
    return blockHTMLObject;
};
exports.buildBlockHTMLObject = buildBlockHTMLObject;
class BlockHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.BlockHTMLObject = BlockHTMLObject;
//# sourceMappingURL=BlockHTMLObject.js.map