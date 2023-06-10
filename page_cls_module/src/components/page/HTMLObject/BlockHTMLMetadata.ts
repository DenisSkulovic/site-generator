import { Metadata } from "src/components/Metadata";

export const buildBlockHTMLMetadata = (obj: any): BlockHTMLMetadata => {
    const metadata = new BlockHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class BlockHTMLMetadata extends Metadata {}