import { Metadata } from "../../../";

export const buildBlockConfigMetadata = (obj: any): BlockConfigMetadata => {
    const metadata = new BlockConfigMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class BlockConfigMetadata extends Metadata {}