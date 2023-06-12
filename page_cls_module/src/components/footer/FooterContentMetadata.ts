import { Metadata } from "@/components/Metadata";

export const buildFooterContentMetadata = (obj: any): FooterContentMetadata => {
    const metadata = new FooterContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}


export class FooterContentMetadata extends Metadata {}