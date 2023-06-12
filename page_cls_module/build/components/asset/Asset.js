"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
class Asset {
    constructor(uuid, name, path, s3Path, s3Link, position, tag) {
        this.uuid = uuid;
        this.name = name;
        this.path = path;
        this.s3Path = s3Path;
        this.s3Link = s3Link;
        this.tag = tag;
        this.position = position;
        this.clazz = this.constructor.name;
    }
}
exports.Asset = Asset;
//# sourceMappingURL=Asset.js.map