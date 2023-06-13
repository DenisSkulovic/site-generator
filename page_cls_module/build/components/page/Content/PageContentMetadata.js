import { Metadata } from "../../../";
export const buildPageContentMetadata = (obj) => {
    const metadata = new PageContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class PageContentMetadata extends Metadata {
}
//# sourceMappingURL=PageContentMetadata.js.map