import { Metadata } from "@/components/Metadata";

export const buildHeaderContentMetadata = (obj: any): HeaderContentMetadata => {
    const metadata = new HeaderContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class HeaderContentMetadata extends Metadata {}