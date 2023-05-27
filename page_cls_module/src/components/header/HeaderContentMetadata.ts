export const buildHeaderContentMetadata = (obj: any): HeaderContentMetadata => {
    if (obj.clazz !== "HeaderContentMetadata") throw new Error("clazz cannot be anything other than 'HeaderContentMetadata'")
    const headerContentMetadata: HeaderContentMetadata = new HeaderContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return headerContentMetadata
}

export class HeaderContentMetadata {
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