export const buildHeaderHTMLMetadata = (obj: any): HeaderHTMLMetadata => {
    if (obj.clazz !== "HeaderHTMLMetadata") throw new Error("clazz cannot be anything other than 'HeaderHTMLMetadata'")
    const headerHTMLMetadata: HeaderHTMLMetadata = new HeaderHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return headerHTMLMetadata
}

export class HeaderHTMLMetadata {
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