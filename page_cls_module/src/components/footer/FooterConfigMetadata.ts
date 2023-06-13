import { Metadata } from "../../";

export const buildFooterConfigMetadata = (obj: any): FooterConfigMetadata => {
    const metadata = new FooterConfigMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class FooterConfigMetadata extends Metadata {}