export const buildPageContentMetadata = (obj: any): PageContentMetadata => {
    if (obj.clazz !== "PageContentMetadata") throw new Error("clazz cannot be anything other than 'PageContentMetadata'")
    const metadata: PageContentMetadata = new PageContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class PageContentMetadata {
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