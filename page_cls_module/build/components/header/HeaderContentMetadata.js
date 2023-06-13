import { Metadata } from "../../";
export const buildHeaderContentMetadata = (obj) => {
    const metadata = new HeaderContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class HeaderContentMetadata extends Metadata {
}
//# sourceMappingURL=HeaderContentMetadata.js.map