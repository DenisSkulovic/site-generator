"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleAsset = void 0;
const Asset_1 = require("./Asset");
const AssetPositionEnum_1 = require("./AssetPositionEnum");
const AssetTagEnum_1 = require("./AssetTagEnum");
const AssetTypeEnum_1 = require("./AssetTypeEnum");
class StyleAsset extends Asset_1.Asset {
    constructor(uuid, name, path, s3Path, s3Link, position = AssetPositionEnum_1.AssetPositionEnum.BODY_END) {
        super(uuid, name, path, s3Path, s3Link, position, AssetTagEnum_1.AssetTagEnum.STYLE);
        this.type = AssetTypeEnum_1.AssetTypeEnum.CSS;
        this.clazz = this.constructor.name;
    }
}
exports.StyleAsset = StyleAsset;
//# sourceMappingURL=StyleAsset.js.map