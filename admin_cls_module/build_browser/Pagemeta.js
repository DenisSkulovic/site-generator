import { buildPagemetaMetadata } from "./PagemetaMetadata";
export const buildPagemeta = (obj) => {
    const metadata = new Pagemeta(obj.path, obj.s3Path, obj.s3Link, obj.versionTag, obj.isPublished, buildPagemetaMetadata(obj.metadata));
    return metadata;
};
export class Pagemeta {
    constructor(path, s3Path, s3Link, versionTag, isPublished, metadata) {
        this.path = path;
        this.s3Path = s3Path;
        this.s3Link = s3Link;
        this.versionTag = versionTag;
        this.isPublished = isPublished;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=Pagemeta.js.map