import { Asset } from "./Asset"
import { AssetPositionEnum } from "./AssetPositionEnum"
import { AssetTagEnum } from "./AssetTagEnum"
import { AssetTypeEnum } from "./AssetTypeEnum"

export class StyleAsset extends Asset {
    type = AssetTypeEnum.CSS
    constructor(
        relativePath: string,
        s3Path: string,
        position = AssetPositionEnum.BODY_END
    ) {
        super(
            relativePath,
            s3Path,
            position,
            AssetTagEnum.STYLE
        )
        this.clazz = this.constructor.name
    }
}