import type { NestableConfig } from "../../classes/NestableConfig";
import editPageConfig from "../../state/pageConfig/editPageConfig"
import type { PageConfig, AreaConfig, BlockConfig } from "../../../../../page_cls_module"
import { cloneDeep } from "lodash"
import type { NestableItem } from "../../classes/NestableItem";
import { NestableItemArea } from "@/classes/NestableItemArea";
import { NestableItemBlock } from "@/classes/NestableItemBlock";
import { reactive } from "vue";

import newAreaConfigMap from "@/state/pageConfig/newAreaConfigMap"
import newBlockConfigMap from "@/state/pageConfig/newBlockConfigMap"

const processItem = ( // recursion
    item: NestableItem,
    parentConfigItem: AreaConfig | null,
    pageConfig: PageConfig,
) => {
    if (item instanceof NestableItemArea) {
        const editItemClone: AreaConfig = reactive(cloneDeep(item.areaConfig_edit))
        editItemClone.childConfigArr = [] // clone, but empty the array
        if (item.isNew) newAreaConfigMap.value.set(editItemClone.uuid, editItemClone)
        if (!parentConfigItem) pageConfig.areaConfigArr.push(editItemClone)
        parentConfigItem?.childConfigArr.push(editItemClone)
        item.children?.forEach((subitem) => {
            processItem(subitem, editItemClone, pageConfig)
        })
    } else if (item instanceof NestableItemBlock) {
        const editItemClone: BlockConfig = reactive(cloneDeep(item.blockConfig_edit))
        if (item.isNew) newBlockConfigMap.value.set(editItemClone.uuid, editItemClone)
        parentConfigItem?.childConfigArr.push(editItemClone)
    } else {
        throw new Error("item must be a Block or an Area config")
    }
}

const buildPageConfigFromNestableConfig = (nestableConfig: NestableConfig): PageConfig => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    const pageConfigClone: PageConfig = reactive(cloneDeep(editPageConfig.value))
    pageConfigClone.areaConfigArr = [] // clone, but empty the array
    nestableConfig.forEach((nestableItem: NestableItem) => {
        processItem(nestableItem, null, pageConfigClone)
    })
    return reactive(pageConfigClone)
}

export default buildPageConfigFromNestableConfig