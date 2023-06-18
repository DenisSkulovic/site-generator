"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkAsset = void 0;
const Asset_1 = require("./Asset");
const AssetTagEnum_1 = require("./AssetTagEnum");
const AssetPositionEnum_1 = require("./AssetPositionEnum");
class LinkAsset extends Asset_1.Asset {
    constructor(uuid, name, href, path, s3Path, s3Link, rel, position = AssetPositionEnum_1.AssetPositionEnum.HEAD_END) {
        super(uuid, name, path, s3Path, s3Link, position, AssetTagEnum_1.AssetTagEnum.LINK);
        this.href = href;
        this.rel = rel;
        this.clazz = this.constructor.name;
    }
}
exports.LinkAsset = LinkAsset;
//# sourceMappingURL=LinkAsset.js.map