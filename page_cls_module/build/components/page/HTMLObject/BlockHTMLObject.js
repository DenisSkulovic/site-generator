import { buildBlockHTMLMetadata } from "./BlockHTMLMetadata";
export const buildBlockHTMLObject = (obj) => {
    if (obj.clazz !== "BlockHTMLObject")
        throw new Error("clazz cannot be anything other than 'BlockHTMLObject'");
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.blockMetadata)
        throw new Error("blockMetadata cannot be undefined");
    const blockHTMLMetadata = buildBlockHTMLMetadata(obj.blockMetadata);
    const blockHTMLObject = new BlockHTMLObject(obj.uuid, obj.html, blockHTMLMetadata);
    return blockHTMLObject;
};
export class BlockHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=BlockHTMLObject.js.map