import { Metadata } from "@/components/Metadata";

export const buildHeaderHTMLMetadata = (obj: any): HeaderHTMLMetadata => {
    const metadata = new HeaderHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class HeaderHTMLMetadata extends Metadata {}