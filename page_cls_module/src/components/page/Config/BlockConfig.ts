import { BlockTemplateEnum, BootstrapVersionEnum, BlockConfigMetadata } from "../../../"

export const buildBlockConfig = (obj: any): BlockConfig => {
    if (!obj.uuid) throw new Error("uuid cannot be undefined")
    if (!obj.blockName) throw new Error("blockName cannot be undefined")
    if (!obj.bootstrapVersion) throw new Error("bootstrapVersion cannot be undefined")
    if (!obj.blockTemplateName) throw new Error("blockTemplateName cannot be undefined")
    if (!obj.metadata) throw new Error("metadata cannot be undefined")
    if (obj.clazz !== "BlockConfig") throw new Error("clazz cannot be anything other than 'BlockConfig'")
    if (!Object.values(BootstrapVersionEnum).includes(obj.bootstrapVersion)) throw new Error("unrecognized bootstrapVersion: " + obj.bootstrapVersion)
    if (!Object.values(BlockTemplateEnum).includes(obj.blockTemplateName)) throw new Error("unrecognized blockTemplateName: " + obj.blockTemplateName)
    const blockConfig: BlockConfig = new BlockConfig(
        obj.uuid,
        obj.blockName,
        obj.bootstrapVersion,
        obj.blockTemplateName,
        obj.metadata,
    )
    return blockConfig
}

export class BlockConfig {
    uuid: string
    blockName: string
    bootstrapVersion: BootstrapVersionEnum
    blockTemplateName: BlockTemplateEnum
    metadata: BlockConfigMetadata
    clazz: string
    constructor(
        uuid: string,
        blockName: string,
        bootstrapVersion: BootstrapVersionEnum,
        blockTemplateName: BlockTemplateEnum,
        metadata: BlockConfigMetadata,
    ) {
        this.uuid = uuid
        this.blockName = blockName
        this.bootstrapVersion = bootstrapVersion
        this.blockTemplateName = blockTemplateName
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}