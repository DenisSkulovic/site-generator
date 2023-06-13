import { Metadata } from "../../";
export const buildFooterContentMetadata = (obj) => {
    const metadata = new FooterContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class FooterContentMetadata extends Metadata {
}
//# sourceMappingURL=FooterContentMetadata.js.map