import { Metadata } from "src/components/Metadata";

export const buildPageContentMetadata = (obj: any): PageContentMetadata => {
    const metadata = new PageContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class PageContentMetadata extends Metadata {}