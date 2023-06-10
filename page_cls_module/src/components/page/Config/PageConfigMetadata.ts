import { Metadata } from "src/components/Metadata";

export const buildPageConfigMetadata = (obj: any): PageConfigMetadata => {
    const metadata = new PageConfigMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class PageConfigMetadata extends Metadata {}