import { Metadata } from "../../../";
export const buildHeaderHTMLMetadata = (obj) => {
    const metadata = new HeaderHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class HeaderHTMLMetadata extends Metadata {
}
//# sourceMappingURL=HeaderHTMLMetadata.js.map