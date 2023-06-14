import { Metadata } from "../../";

export const buildFooterHTMLMetadata = (obj: any): FooterHTMLMetadata => {
    const metadata = new FooterHTMLMetadata(
        obj.configUUID,
        obj.contentUUID,
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class FooterHTMLMetadata extends Metadata {
    configUUID: string
    contentUUID: string
    constructor(
        configUUID: string,
        contentUUID: string,
        createdTimestamp: number,
        updatedTimestamp: number,
    ) {
        super(createdTimestamp, updatedTimestamp)
        this.configUUID = configUUID
        this.contentUUID = contentUUID
    }
}