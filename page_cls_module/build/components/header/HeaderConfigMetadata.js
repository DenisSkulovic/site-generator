import { Metadata } from "../../";
export const buildHeaderConfigMetadata = (obj) => {
    const metadata = new HeaderConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class HeaderConfigMetadata extends Metadata {
}
//# sourceMappingURL=HeaderConfigMetadata.js.map