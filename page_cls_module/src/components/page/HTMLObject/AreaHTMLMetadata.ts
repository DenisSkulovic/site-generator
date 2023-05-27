export const buildAreaHTMLMetadata = (obj: any): AreaHTMLMetadata => {
    if (obj.clazz !== "AreaHTMLMetadata") throw new Error("clazz cannot be anything other than 'AreaHTMLMetadata'")
    const areaHTMLMetadata: AreaHTMLMetadata = new AreaHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return areaHTMLMetadata
}

export class AreaHTMLMetadata {
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