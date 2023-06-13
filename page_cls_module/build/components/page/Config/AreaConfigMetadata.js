import { Metadata } from "../../../";
export const buildAreaConfigMetadata = (obj) => {
    const metadata = new AreaConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class AreaConfigMetadata extends Metadata {
}
//# sourceMappingURL=AreaConfigMetadata.js.map