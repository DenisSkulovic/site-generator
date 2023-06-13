import { Metadata } from "../../../";
export const buildPageHTMLMetadata = (obj) => {
    const metadata = new PageHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class PageHTMLMetadata extends Metadata {
}
//# sourceMappingURL=PageHTMLMetadata.js.map