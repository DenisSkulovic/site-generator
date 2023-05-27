import type { AreaConfig, BlockConfig } from "../../../../../page_cls_module"
import { NestableItemArea } from "@/classes/NestableItemArea"
import { NestableItemBlock } from "@/classes/NestableItemBlock"
import { NestableConfig } from "@/classes/NestableConfig"
import { reactive } from "vue"

const generateNestableConfigFromToDeleteMaps = (
    toDeleteAreasMap: Map<string, AreaConfig>,
    toDeleteBlocksMap: Map<string, BlockConfig>,
): NestableConfig => {
    const toDeleteNestableConfig = reactive(new NestableConfig())

    toDeleteAreasMap.forEach((areaConfig: AreaConfig) => {
        const nestableItem = reactive(new NestableItemArea(
            areaConfig.uuid, []
        ))
        toDeleteNestableConfig.push(nestableItem)
    })
    toDeleteBlocksMap.forEach((blockConfig: BlockConfig) => {
        const nestableItem = reactive(new NestableItemBlock(
            blockConfig.uuid, []
        ))
        toDeleteNestableConfig.push(nestableItem)
    })

    return toDeleteNestableConfig
}

export default generateNestableConfigFromToDeleteMaps