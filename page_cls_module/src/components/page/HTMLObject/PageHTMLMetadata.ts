import { Metadata } from "src/components/Metadata";

export const buildPageHTMLMetadata = (obj: any): PageHTMLMetadata => {
    const metadata = new PageHTMLMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class PageHTMLMetadata extends Metadata {}