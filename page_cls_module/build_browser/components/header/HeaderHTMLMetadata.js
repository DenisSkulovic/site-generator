import { Metadata } from "../..";
export const buildHeaderHTMLMetadata = (obj) => {
    const metadata = new HeaderHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class HeaderHTMLMetadata extends Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
//# sourceMappingURL=HeaderHTMLMetadata.js.map