import { AreaConfigMetadata, AreaLayoutEnum, BlockConfig, BootstrapVersionEnum } from "../../../";
import {buildBlockConfig} from "./BlockConfig"

export const buildAreaConfig = (obj: any): AreaConfig => {
    if (!obj.uuid) throw new Error("uuid cannot be undefined")
    if (!obj.areaName) throw new Error("areaName cannot be undefined")
    if (!obj.metadata) throw new Error("metadata is a mandatory field")
    if (!Object.values(AreaLayoutEnum).includes(obj.areaTemplateName)) throw new Error("unrecognized areaTemplateName")
    if (!Object.values(BootstrapVersionEnum).includes(obj.bootstrapVersion)) throw new Error("unrecognized bootstrapVersion")
    if (obj.clazz !== "AreaConfig") throw new Error("clazz cannot be anything other than 'AreaConfig'")
    const areaTemplateName: AreaLayoutEnum = obj.areaTemplateName
    const bootstrapVersion: BootstrapVersionEnum = obj.bootstrapVersion
    const blockConfigArr: BlockConfig[] = obj.childConfigArr.map((obj: any): AreaConfig | BlockConfig => {
        if (!obj.clazz) throw new Error("objects must have a 'clazz' value")
        if (obj.clazz === "BlockConfig") {
            const blockConfig: BlockConfig = buildBlockConfig(obj)
            return blockConfig
        } else if (obj.clazz === "AreaConfig") {
            const areaConfig: AreaConfig = buildAreaConfig(obj)
            return areaConfig
        } else {
            throw new Error("cannot process config of clazz: " + obj.clazz)
        }
    })
    const metadata: AreaConfigMetadata = new AreaConfigMetadata(
        obj.metadata.createdTimestamp,
        obj.metadata.updatedTimestamp,
    )
    const areaConfig: AreaConfig = new AreaConfig(
        obj.uuid,
        obj.areaName,
        Boolean(obj.isIncludeContainer),
        areaTemplateName,
        bootstrapVersion,
        obj.justify || "",
        obj.align || "",
        blockConfigArr,
        metadata,
    )
    return areaConfig
}

export class AreaConfig {
    uuid: string
    areaName: string
    isIncludeContainer: boolean
    areaTemplateName: AreaLayoutEnum
    bootstrapVersion: BootstrapVersionEnum
    justify: string
    align: string
    childConfigArr: (AreaConfig | BlockConfig)[]
    metadata: AreaConfigMetadata
    clazz: string
    constructor(
        uuid: string,
        areaName: string,
        isIncludeContainer: boolean,
        areaTemplateName: AreaLayoutEnum,
        bootstrapVersion: BootstrapVersionEnum,
        justify: string,
        align: string,
        childConfigArr: (AreaConfig | BlockConfig)[],
        metadata: AreaConfigMetadata
    ) {
        this.uuid = uuid
        this.areaName = areaName
        this.isIncludeContainer = isIncludeContainer
        this.areaTemplateName = areaTemplateName
        this.bootstrapVersion = bootstrapVersion
        this.justify = justify
        this.align = align
        this.childConfigArr = childConfigArr
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}