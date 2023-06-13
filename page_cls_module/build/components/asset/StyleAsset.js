import { Asset } from "./Asset";
import { AssetPositionEnum } from "./AssetPositionEnum";
import { AssetTagEnum } from "./AssetTagEnum";
import { AssetTypeEnum } from "./AssetTypeEnum";
export class StyleAsset extends Asset {
    constructor(uuid, name, path, s3Path, s3Link, position = AssetPositionEnum.BODY_END) {
        super(uuid, name, path, s3Path, s3Link, position, AssetTagEnum.STYLE);
        this.type = AssetTypeEnum.CSS;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=StyleAsset.js.map