import { Metadata } from "../../../";
export const buildAreaHTMLMetadata = (obj) => {
    const metadata = new AreaHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class AreaHTMLMetadata extends Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
//# sourceMappingURL=AreaHTMLMetadata.js.map