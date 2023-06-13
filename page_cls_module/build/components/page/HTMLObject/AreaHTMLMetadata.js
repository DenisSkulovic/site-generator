import { Metadata } from "../../../";
export const buildAreaHTMLMetadata = (obj) => {
    const metadata = new AreaHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class AreaHTMLMetadata extends Metadata {
}
//# sourceMappingURL=AreaHTMLMetadata.js.map