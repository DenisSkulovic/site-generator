export const buildHeaderConfigMetadata = (obj: any): HeaderConfigMetadata => {
    if (obj.clazz !== "HeaderConfigMetadata") throw new Error("clazz cannot be anything other than 'HeaderConfigMetadata'")
    const metadata: HeaderConfigMetadata = new HeaderConfigMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class HeaderConfigMetadata {
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