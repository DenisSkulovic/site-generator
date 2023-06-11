import { Asset } from "./Asset"
import { AssetPositionEnum } from "./AssetPositionEnum"
import { AssetTagEnum } from "./AssetTagEnum"
import { AssetTypeEnum } from "./AssetTypeEnum"

export class StyleAsset extends Asset {
    type = AssetTypeEnum.CSS
    constructor(
        uuid: string,
        name: string,
        path: string,
        s3Path: string,
        s3Link: string,
        position = AssetPositionEnum.BODY_END
    ) {
        super(
            uuid,
            name,
            path,
            s3Path,
            s3Link,
            position,
            AssetTagEnum.STYLE
        )
        this.clazz = this.constructor.name
    }
}