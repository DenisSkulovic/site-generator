import { Asset } from "./Asset";
import { AssetTagEnum } from "./AssetTagEnum";
import { AssetRelEnum } from "./AssetRelEnum";
import { AssetPositionEnum } from "./AssetPositionEnum";

export class LinkAsset extends Asset {
    rel: AssetRelEnum
    constructor(
        uuid: string,
        name: string,
        path: string,
        s3Path: string,
        s3Link: string,
        rel: AssetRelEnum,
        position = AssetPositionEnum.HEAD_END
    ) {
        super(
            uuid,
            name,
            path,
            s3Path,
            s3Link,
            position,
            AssetTagEnum.LINK,
        )
        this.rel = rel
        this.clazz = this.constructor.name
    }
}