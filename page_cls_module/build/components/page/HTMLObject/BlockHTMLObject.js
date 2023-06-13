import { buildBlockHTMLMetadata } from "./BlockHTMLMetadata";
import { buildBlockConfig } from "../Config/BlockConfig";
import { buildBlockContent } from "../Content/BlockContent";
export const buildBlockHTMLObject = (obj) => {
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
    const config = buildBlockConfig(obj.config);
    const blockHTMLMetadata = buildBlockHTMLMetadata(obj.blockMetadata);
    const content = buildBlockContent(obj.content);
    const blockHTMLObject = new BlockHTMLObject(obj.uuid, obj.html, config, content, blockHTMLMetadata);
    return blockHTMLObject;
};
export class BlockHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=BlockHTMLObject.js.map