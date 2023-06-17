import { Metadata } from "../../../";
export const buildPageHTMLMetadata = (obj) => {
    const metadata = new PageHTMLMetadata(obj.configUUID, obj.contentUUID, obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class PageHTMLMetadata extends Metadata {
    constructor(configUUID, contentUUID, createdTimestamp, updatedTimestamp) {
        super(createdTimestamp, updatedTimestamp);
        this.configUUID = configUUID;
        this.contentUUID = contentUUID;
    }
}
//# sourceMappingURL=PageHTMLMetadata.js.map