import { Metadata } from "../..";

export const buildHeaderHTMLMetadata = (obj: any): HeaderHTMLMetadata => {
    const metadata = new HeaderHTMLMetadata(
        obj.configUUID,
        obj.contentUUID,
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class HeaderHTMLMetadata extends Metadata {
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