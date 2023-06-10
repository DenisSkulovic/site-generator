import { Metadata } from "src/components/Metadata";

export const buildBlockContentMetadata = (obj: any): BlockContentMetadata => {
    const metadata = new BlockContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class BlockContentMetadata extends Metadata {}