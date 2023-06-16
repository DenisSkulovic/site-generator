import { Metadata } from "../../";
export const buildFooterHTMLMetadata = (obj) => {
    const metadata = new FooterHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class FooterHTMLMetadata extends Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
//# sourceMappingURL=FooterHTMLMetadata.js.map