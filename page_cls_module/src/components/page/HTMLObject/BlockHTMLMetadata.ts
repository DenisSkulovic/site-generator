import { Metadata } from "../../../";

export const buildBlockHTMLMetadata = (obj: any): BlockHTMLMetadata => {
    const metadata = new BlockHTMLMetadata(
        obj.configUUID,
        obj.contentUUID,
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class BlockHTMLMetadata extends Metadata {
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