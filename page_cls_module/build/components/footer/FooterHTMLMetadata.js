import { Metadata } from "../../";
export const buildFooterHTMLMetadata = (obj) => {
    const metadata = new FooterHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class FooterHTMLMetadata extends Metadata {
}
//# sourceMappingURL=FooterHTMLMetadata.js.map