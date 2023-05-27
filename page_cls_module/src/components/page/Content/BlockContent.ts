import {BlockContentMetadata, buildBlockContentMetadata} from "./BlockContentMetadata"

export const buildBlockContent = (obj: any): BlockContent => {
    if (!obj.uuid) throw new Error("uuid cannot be undefined")
    if (!obj.metadata) throw new Error("metadata cannot be undefined")
    if (obj.clazz !== "BlockContent") throw new Error("clazz cannot be anything other than 'BlockContent'")
    const metadata: BlockContentMetadata = buildBlockContentMetadata(obj.metadata)
    
    const blockContent: BlockContent = new BlockContent(
        obj.uuid,
        obj.data,
        metadata,
    )
    return blockContent
}

export class BlockContent { // this should be stored as a separate object, on DynamoDB
    uuid: string
    data: { [key: string]: any }
    metadata: BlockContentMetadata
    clazz: string
    constructor(
        uuid: string,
        data: { [key: string]: any },
        metadata: BlockContentMetadata,
    ) {
        this.uuid = uuid
        this.data = data
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}