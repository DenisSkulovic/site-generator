import { Metadata } from "../../../";

export const buildAreaConfigMetadata = (obj: any): AreaConfigMetadata => {
    const metadata = new AreaConfigMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class AreaConfigMetadata extends Metadata {}