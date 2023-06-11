import { Asset } from "./Asset";
import { AssetPositionEnum } from "./AssetPositionEnum";
import { AssetTagEnum } from "./AssetTagEnum";
import { AssetTypeEnum } from "./AssetTypeEnum";

export class ScriptAsset extends Asset {
    isAsync: boolean
    isDefer: boolean
    type = AssetTypeEnum.JS
    constructor(
        isAsync: boolean,
        isDefer: boolean,
        relativePath: string,
        s3Path: string,
        position = AssetPositionEnum.BODY_END
    ) {
        super(
            relativePath,
            s3Path,
            position,
            AssetTagEnum.SCRIPT
        )
        this.isAsync = isAsync
        this.isDefer = isDefer
        this.clazz = this.constructor.name
    }
}