export const buildFooterHTMLMetadata = (obj: any): FooterHTMLMetadata => {
    if (obj.clazz !== "FooterHTMLMetadata") throw new Error("clazz cannot be anything other than 'FooterHTMLMetadata'")
    const footerHTMLMetadata: FooterHTMLMetadata = new FooterHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return footerHTMLMetadata
}

export class FooterHTMLMetadata {
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