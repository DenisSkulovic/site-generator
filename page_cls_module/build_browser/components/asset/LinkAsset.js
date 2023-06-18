import { Asset } from "./Asset";
import { AssetTagEnum } from "./AssetTagEnum";
import { AssetPositionEnum } from "./AssetPositionEnum";
export class LinkAsset extends Asset {
    constructor(uuid, name, href, path, s3Path, s3Link, rel, position = AssetPositionEnum.HEAD_END) {
        super(uuid, name, path, s3Path, s3Link, position, AssetTagEnum.LINK);
        this.href = href;
        this.rel = rel;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=LinkAsset.js.map