import { Asset } from "./Asset";
import { AssetTagEnum } from "./AssetTagEnum";
import { AssetRelEnum } from "./AssetRelEnum";
import { AssetPositionEnum } from "./AssetPositionEnum";

export class LinkAsset extends Asset {
    rel: AssetRelEnum
    constructor(
        relativePath: string,
        s3Path: string,
        rel: AssetRelEnum,
        position = AssetPositionEnum.HEAD_END
    ) {
        super(
            relativePath,
            s3Path,
            position,
            AssetTagEnum.LINK,
        )
        this.rel = rel
        this.clazz = this.constructor.name
    }
}