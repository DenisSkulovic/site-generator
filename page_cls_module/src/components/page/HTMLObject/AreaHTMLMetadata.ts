import { Metadata } from "../../../";

export const buildAreaHTMLMetadata = (obj: any): AreaHTMLMetadata => {
    const metadata = new AreaHTMLMetadata(
        obj.configUUID,
        obj.contentUUID,
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class AreaHTMLMetadata extends Metadata {
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