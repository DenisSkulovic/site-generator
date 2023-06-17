import { buildBlockContentMetadata } from "./BlockContentMetadata";
export const buildBlockContent = (obj) => {
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    if (obj.clazz !== "BlockContent")
        throw new Error("clazz cannot be anything other than 'BlockContent'");
    const metadata = buildBlockContentMetadata(obj.metadata);
    const blockContent = new BlockContent(obj.uuid, obj.data, metadata);
    return blockContent;
};
export class BlockContent {
    constructor(uuid, data, metadata) {
        this.uuid = uuid;
        this.data = data;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=BlockContent.js.map