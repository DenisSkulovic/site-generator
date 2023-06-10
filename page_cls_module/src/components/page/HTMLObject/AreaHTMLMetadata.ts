import { Metadata } from "src/components/Metadata";

export const buildAreaHTMLMetadata = (obj: any): AreaHTMLMetadata => {
    const metadata = new AreaHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class AreaHTMLMetadata extends Metadata {}