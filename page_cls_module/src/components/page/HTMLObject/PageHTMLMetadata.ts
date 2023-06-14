import { Metadata } from "../../../";

export const buildPageHTMLMetadata = (obj: any): PageHTMLMetadata => {
    const metadata = new PageHTMLMetadata(
        obj.configUUID,
        obj.contentUUID,
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class PageHTMLMetadata extends Metadata {
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