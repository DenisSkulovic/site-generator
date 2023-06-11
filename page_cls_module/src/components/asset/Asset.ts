import { AssetTypeEnum } from "../../"
import { AssetPositionEnum } from "./AssetPositionEnum"
import { AssetTagEnum } from "./AssetTagEnum"

export class Asset {
    uuid: string
    name: string
    path: string
    s3Path: string
    s3Link: string
    tag: AssetTagEnum
    position: AssetPositionEnum
    clazz: string
    constructor(
        uuid: string,
        name: string,
        path: string,
        s3Path: string,
        s3Link: string,
        position: AssetPositionEnum,
        tag: AssetTagEnum
    ) {
        this.uuid = uuid
        this.name = name
        this.path = path
        this.s3Path = s3Path
        this.s3Link = s3Link
        this.tag = tag
        this.position = position
        this.clazz = this.constructor.name
    }
}