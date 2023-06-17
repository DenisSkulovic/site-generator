import { Metadata } from "../../../";
export const buildBlockHTMLMetadata = (obj) => {
    const metadata = new BlockHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class BlockHTMLMetadata extends Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
//# sourceMappingURL=BlockHTMLMetadata.js.map