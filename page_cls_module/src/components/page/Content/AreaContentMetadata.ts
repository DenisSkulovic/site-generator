import { Metadata } from "../../../";

export const buildAreaContentMetadata = (obj: any): AreaContentMetadata => {
    const metadata = new AreaContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

export class AreaContentMetadata extends Metadata {}