import { Metadata } from "../../../";
export const buildBlockHTMLMetadata = (obj) => {
    const metadata = new BlockHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class BlockHTMLMetadata extends Metadata {
}
//# sourceMappingURL=BlockHTMLMetadata.js.map