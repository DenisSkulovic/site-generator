import { AreaConfig, BlockConfig, PageConfig } from "../../../../../page_cls_module/build_browser"
import { NestableConfig } from "../../classes/NestableConfig"
import type { NestableItem } from "../../classes/NestableItem"
import { NestableItemArea } from "../../classes/NestableItemArea"
import { NestableItemBlock } from "../../classes/NestableItemBlock"
import {reactive} from "vue"

const processItem = ( // tasty recursion
    item: AreaConfig | BlockConfig,
    parentNestableItem: NestableItem | null,
    nestableConfig: NestableConfig,
) => {
    if (item instanceof AreaConfig) {
        const newItem: NestableItem = reactive(new NestableItemArea(
            item.uuid,
            [],
        ))
        if (!parentNestableItem) nestableConfig.push(newItem)
        else parentNestableItem.children?.push(newItem)
        item.childConfigArr.forEach((child: AreaConfig | BlockConfig) => {
            processItem(child, newItem, nestableConfig)
        })
    } else if (item instanceof BlockConfig) {
        const newItem: NestableItem = reactive(new NestableItemBlock(
            item.uuid,
            [],
        ))
        if (!parentNestableItem) nestableConfig.push(newItem)
        else parentNestableItem.children?.push(newItem)
    } else {
        throw new Error("can only process AreaConfig or BlockConfig items")
    }
}

const generateNestableConfigFromPageConfig = (pageConfig: PageConfig): NestableConfig => {
    const nestableConfig: NestableConfig = reactive(new NestableConfig())
    pageConfig.areaConfigArr.forEach((areaConfig: AreaConfig) => {
        processItem(areaConfig, null, nestableConfig)
    })
    console.log(`nestableConfig`, nestableConfig)
    return nestableConfig
}

export default generateNestableConfigFromPageConfig