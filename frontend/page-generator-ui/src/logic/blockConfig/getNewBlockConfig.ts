import { BlockConfig, BlockConfigMetadata, BootstrapVersionEnum, BlockTemplateEnum } from "../../../../../page_cls_module/src" 
import getUUID from "../../utils/getUUID" 
import defaultFields from "../../config/defaultFields/blockConfig"
import { reactive } from "vue"

const getNewABlockConfig = (): BlockConfig => {
    const now = Date.now()
    const uuid: string = getUUID()
    const blockName: string = defaultFields.blockName
    const blockTemplateName: BlockTemplateEnum = defaultFields.blockTemplateName
    const bootstrapVersion: BootstrapVersionEnum = defaultFields.bootstrapVersion

    const createdTimestamp = now
    const updatedTimestamp = now
    const metadata = new BlockConfigMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const obj: BlockConfig = reactive(new BlockConfig(
        uuid,
        blockName,
        bootstrapVersion,
        blockTemplateName,
        metadata,
    ))
    return obj
}

export default getNewABlockConfig