import { AssetTypeEnum } from "../../"
import { AssetPositionEnum } from "./AssetPositionEnum"
import { AssetTagEnum } from "./AssetTagEnum"

export class Asset {
    relativePath: string
    s3Path: string
    tag: AssetTagEnum
    position: AssetPositionEnum
    clazz: string
    constructor(
        relativePath: string,
        s3Path: string,
        position: AssetPositionEnum,
        tag: AssetTagEnum
    ) {
        this.relativePath = relativePath
        this.s3Path = s3Path
        this.tag = tag
        this.position = position
        this.clazz = this.constructor.name
    }
}