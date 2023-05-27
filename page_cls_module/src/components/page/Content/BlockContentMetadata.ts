export const buildBlockContentMetadata = (obj: any): BlockContentMetadata => {
    if (obj.clazz !== "BlockContentMetadata") throw new Error("clazz cannot be anything other than 'BlockContentMetadata'")
    const blockContentMetadata: BlockContentMetadata = new BlockContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return blockContentMetadata
}

export class BlockContentMetadata {
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