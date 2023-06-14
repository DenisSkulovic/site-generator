import { BlockHTMLMetadata } from "../../../"
import {buildBlockHTMLMetadata}  from "./BlockHTMLMetadata"

export const buildBlockHTMLObject = (obj: any): BlockHTMLObject => {
    if (obj.clazz !== "BlockHTMLObject") throw new Error("clazz cannot be anything other than 'BlockHTMLObject'")
    if (!obj.uuid) throw new Error("uuid cannot be undefined")
    if (!obj.html) throw new Error("html cannot be undefined")
    if (!obj.blockMetadata) throw new Error("blockMetadata cannot be undefined")
    const blockHTMLMetadata: BlockHTMLMetadata = buildBlockHTMLMetadata(obj.blockMetadata)

    const blockHTMLObject: BlockHTMLObject = new BlockHTMLObject(
        obj.uuid,
        obj.html,
        blockHTMLMetadata,
    )
    return blockHTMLObject
}

export class BlockHTMLObject {
    uuid: string
    html: string
    metadata: BlockHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        metadata: BlockHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}