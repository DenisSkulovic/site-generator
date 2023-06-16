import { buildPagemetaMetadata } from "./PagemetaMetadata";
export const buildPagemeta = (obj) => {
    const metadata = new Pagemeta(obj.path, obj.s3Path, obj.s3Link, obj.contentUUID, obj.configUUID, obj.isPublished, buildPagemetaMetadata(obj.metadata));
    return metadata;
};
export class Pagemeta {
    constructor(path, s3Path, s3Link, contentUUID, configUUID, isPublished, metadata) {
        this.path = path;
        this.s3Path = s3Path;
        this.s3Link = s3Link;
        this.contentUUID = contentUUID;
        this.configUUID = configUUID;
        this.isPublished = isPublished;
        this.metadata = metadata;
    }
}
//# sourceMappingURL=Pagemeta.js.map