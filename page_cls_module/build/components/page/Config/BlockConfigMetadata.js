import { Metadata } from "../../../";
export const buildBlockConfigMetadata = (obj) => {
    const metadata = new BlockConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class BlockConfigMetadata extends Metadata {
}
//# sourceMappingURL=BlockConfigMetadata.js.map