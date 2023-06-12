import { Metadata } from "@/components/Metadata";

export const buildHeaderConfigMetadata = (obj: any): HeaderConfigMetadata => {
    const metadata = new HeaderConfigMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class HeaderConfigMetadata extends Metadata {}