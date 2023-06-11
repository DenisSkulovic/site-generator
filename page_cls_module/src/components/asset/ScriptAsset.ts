import { Asset } from "./Asset";
import { AssetPositionEnum } from "./AssetPositionEnum";
import { AssetTagEnum } from "./AssetTagEnum";
import { AssetTypeEnum } from "./AssetTypeEnum";

export class ScriptAsset extends Asset {
    isAsync: boolean
    isDefer: boolean
    type = AssetTypeEnum.JS
    constructor(
        uuid: string,
        name: string,
        isAsync: boolean,
        isDefer: boolean,
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
            AssetTagEnum.SCRIPT
        )
        this.isAsync = isAsync
        this.isDefer = isDefer
        this.clazz = this.constructor.name
    }
}