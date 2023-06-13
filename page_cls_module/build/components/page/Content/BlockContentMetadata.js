import { Metadata } from "../../../";
export const buildBlockContentMetadata = (obj) => {
    const metadata = new BlockContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class BlockContentMetadata extends Metadata {
}
//# sourceMappingURL=BlockContentMetadata.js.map