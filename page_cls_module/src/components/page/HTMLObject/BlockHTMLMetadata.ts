export const buildBlockHTMLMetadata = (obj: any): BlockHTMLMetadata => {
    if (obj.clazz !== "BlockHTMLMetadata") throw new Error("clazz cannot be anything other than 'BlockHTMLMetadata'")
    const blockHTMLMetadata: BlockHTMLMetadata = new BlockHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return blockHTMLMetadata
}

export class BlockHTMLMetadata {
    createdTimestamp: number
    updatedTimestamp: number
    clazz: string
    constructor(
        createdTimestamp: number,
        updatedTimestamp: number,
    ) {
        this.createdTimestamp = createdTimestamp
        this.updatedTimestamp = updatedTimestamp
        this.clazz = this.constructor.name
    }
}