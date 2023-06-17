import { Metadata } from "../../../";
export const buildPageConfigMetadata = (obj) => {
    const metadata = new PageConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class PageConfigMetadata extends Metadata {
}
//# sourceMappingURL=PageConfigMetadata.js.map