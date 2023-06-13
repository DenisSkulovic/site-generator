import { Metadata } from "../../";
export const buildFooterConfigMetadata = (obj) => {
    const metadata = new FooterConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class FooterConfigMetadata extends Metadata {
}
//# sourceMappingURL=FooterConfigMetadata.js.map