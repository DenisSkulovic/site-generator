import { Metadata } from "@/components/Metadata";

export const buildFooterHTMLMetadata = (obj: any): FooterHTMLMetadata => {
    const metadata = new FooterHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class FooterHTMLMetadata extends Metadata {}