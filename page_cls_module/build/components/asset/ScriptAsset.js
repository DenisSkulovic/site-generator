import { Asset } from "./Asset";
import { AssetPositionEnum } from "./AssetPositionEnum";
import { AssetTagEnum } from "./AssetTagEnum";
import { AssetTypeEnum } from "./AssetTypeEnum";
export class ScriptAsset extends Asset {
    constructor(uuid, name, isAsync, isDefer, path, s3Path, s3Link, position = AssetPositionEnum.BODY_END) {
        super(uuid, name, path, s3Path, s3Link, position, AssetTagEnum.SCRIPT);
        this.type = AssetTypeEnum.JS;
        this.isAsync = isAsync;
        this.isDefer = isDefer;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=ScriptAsset.js.map