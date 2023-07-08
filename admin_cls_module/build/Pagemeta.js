"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagemeta = exports.buildPagemeta = void 0;
const PagemetaMetadata_1 = require("./PagemetaMetadata");
const buildPagemeta = (obj) => {
    const metadata = new Pagemeta(obj.path, obj.s3Path, obj.s3Link, obj.versionTag, obj.isPublished, (0, PagemetaMetadata_1.buildPagemetaMetadata)(obj.metadata));
    return metadata;
};
exports.buildPagemeta = buildPagemeta;
class Pagemeta {
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
exports.Pagemeta = Pagemeta;
//# sourceMappingURL=Pagemeta.js.map