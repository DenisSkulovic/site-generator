export const buildPageConfigMetadata = (obj: any): PageConfigMetadata => {
    if (obj.clazz !== "PageConfigMetadata") throw new Error("clazz cannot be anything other than 'PageConfigMetadata'")

    const pageConfigMetadata: PageConfigMetadata = new PageConfigMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return pageConfigMetadata
}

export class PageConfigMetadata {
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