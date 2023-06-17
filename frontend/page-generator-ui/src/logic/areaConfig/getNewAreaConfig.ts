import { AreaConfig, AreaConfigMetadata, AreaLayoutEnum, BootstrapVersionEnum, BlockConfig } from "../../../../../page_cls_module/build_browser" 
import getUUID from "../../utils/getUUID" 
import defaultFields from "../../config/defaultFields/areaConfig"
import { reactive } from "vue"

const getNewAreaConfig = (): AreaConfig => {
    const now = Date.now()
    const uuid: string = getUUID()
    const areaName = defaultFields.areaName
    const isIncludeContainer = defaultFields.isIncludeContainer
    const areaTemplateName: AreaLayoutEnum = defaultFields.areaTemplateName
    const bootstrapVersion: BootstrapVersionEnum = defaultFields.bootstrapVersion
    const childConfigArr: (AreaConfig | BlockConfig)[] = []

    const createdTimestamp = now
    const updatedTimestamp = now
    const metadata = new AreaConfigMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const justify = ""
    const align = ""
    const obj: AreaConfig = reactive(new AreaConfig(
        uuid,
        areaName,
        isIncludeContainer,
        areaTemplateName,
        bootstrapVersion,
        justify,
        align,
        childConfigArr,
        metadata,
    ))
    return obj
}

export default getNewAreaConfig