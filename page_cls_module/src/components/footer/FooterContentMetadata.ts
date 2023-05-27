export const buildFooterContentMetadata = (obj: any): FooterContentMetadata => {
    if (obj.clazz !== "FooterContentMetadata") throw new Error("clazz cannot be anything other than 'FooterContentMetadata'")
    const footerContentMetadata: FooterContentMetadata = new FooterContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return footerContentMetadata
}

export class FooterContentMetadata {
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