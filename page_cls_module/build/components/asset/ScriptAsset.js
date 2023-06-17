"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptAsset = void 0;
const Asset_1 = require("./Asset");
const AssetPositionEnum_1 = require("./AssetPositionEnum");
const AssetTagEnum_1 = require("./AssetTagEnum");
const AssetTypeEnum_1 = require("./AssetTypeEnum");
class ScriptAsset extends Asset_1.Asset {
    constructor(uuid, name, isAsync, isDefer, path, s3Path, s3Link, position = AssetPositionEnum_1.AssetPositionEnum.BODY_END) {
        super(uuid, name, path, s3Path, s3Link, position, AssetTagEnum_1.AssetTagEnum.SCRIPT);
        this.type = AssetTypeEnum_1.AssetTypeEnum.JS;
        this.isAsync = isAsync;
        this.isDefer = isDefer;
        this.clazz = this.constructor.name;
    }
}
exports.ScriptAsset = ScriptAsset;
//# sourceMappingURL=ScriptAsset.js.map