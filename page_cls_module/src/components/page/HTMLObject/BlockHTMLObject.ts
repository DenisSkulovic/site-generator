import { BlockConfig, BlockContent, BlockHTMLMetadata } from "../../../"
import {buildBlockHTMLMetadata}  from "./BlockHTMLMetadata"
import {buildBlockConfig}  from "../Config/BlockConfig"
import {buildBlockContent} from "../Content/BlockContent"

export const buildBlockHTMLObject = (obj: any): BlockHTMLObject => {
    if (obj.clazz !== "BlockHTMLObject") throw new Error("clazz cannot be anything other than 'BlockHTMLObject'")
    if (!obj.uuid) throw new Error("uuid cannot be undefined")
    if (!obj.html) throw new Error("html cannot be undefined")
    if (!obj.config) throw new Error("config cannot be undefined")
    if (!obj.blockMetadata) throw new Error("blockMetadata cannot be undefined")
    if (!obj.content) throw new Error("content cannot be undefined")
    const config: BlockConfig = buildBlockConfig(obj.config)
    const blockHTMLMetadata: BlockHTMLMetadata = buildBlockHTMLMetadata(obj.blockMetadata)
    const content: BlockContent = buildBlockContent(obj.content)

    const blockHTMLObject: BlockHTMLObject = new BlockHTMLObject(
        obj.uuid,
        obj.html,
        config,
        content,
        blockHTMLMetadata,
    )
    return blockHTMLObject
}

export class BlockHTMLObject {
    uuid: string
    html: string
    config: BlockConfig
    content: BlockContent
    metadata: BlockHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        config: BlockConfig,
        content: BlockContent,
        metadata: BlockHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.config = config
        this.content = content
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}