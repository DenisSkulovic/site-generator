export const buildFooterConfigMetadata = (obj: any): FooterConfigMetadata => {
    if (obj.clazz !== "FooterConfigMetadata") throw new Error("clazz cannot be anything other than 'FooterConfigMetadata'")
    const footerConfigMetadata: FooterConfigMetadata = new FooterConfigMetadata(
        obj.createdTimestamp, 
        obj.updatedTimestamp,
    )
    return footerConfigMetadata
}

export class FooterConfigMetadata {
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