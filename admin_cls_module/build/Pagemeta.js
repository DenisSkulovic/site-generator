"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagemeta = exports.buildPagemeta = void 0;
const PagemetaMetadata_1 = require("./PagemetaMetadata");
const buildPagemeta = (obj) => {
    const metadata = new Pagemeta(obj.path, obj.s3Path, obj.s3Link, obj.contentUUID, obj.configUUID, obj.isPublished, (0, PagemetaMetadata_1.buildPagemetaMetadata)(obj.metadata));
    return metadata;
};
exports.buildPagemeta = buildPagemeta;
class Pagemeta {
    constructor(path, s3Path, s3Link, contentUUID, configUUID, isPublished, metadata) {
        this.path = path;
        this.s3Path = s3Path;
        this.s3Link = s3Link;
        this.contentUUID = contentUUID;
        this.configUUID = configUUID;
        this.isPublished = isPublished;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.Pagemeta = Pagemeta;
//# sourceMappingURL=Pagemeta.js.map