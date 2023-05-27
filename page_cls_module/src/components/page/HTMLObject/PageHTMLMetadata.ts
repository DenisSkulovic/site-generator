export const buildPageHTMLMetadata = (obj: any): PageHTMLMetadata => {
    if (obj.clazz !== "PageHTMLMetadata") throw new Error("clazz cannot be anything other than 'PageHTMLMetadata'")
    const pageHTMLMetadata: PageHTMLMetadata = new PageHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return pageHTMLMetadata
}

export class PageHTMLMetadata {
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