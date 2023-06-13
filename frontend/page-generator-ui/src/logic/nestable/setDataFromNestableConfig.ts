import {nestableConfig} from "../../state/nestableState"
import type { PageConfig, PageContent } from "../../../../../page_cls_module"
import buildPageConfigFromNestableConfig from "./buildPageConfigFromNestableConfig"
import buildPageContentFromNestableConfig from "./buildPageContentFromNestableConfig"

import {toDeleteAreaConfigMap, toDeleteBlockConfigMap, newAreaConfigMap, editPageConfig} from "../../state/pageConfigState"
import {toDeleteAreaContentMap, toDeleteBlockContentMap, editPageContent} from "../../state/pageContentState"

import toDeleteNestableItemMap from "../../computed/nestable/toDeleteNestableItemMap"
import type { NestableItem } from "@/classes/NestableItem"
import { NestableItemArea } from "@/classes/NestableItemArea"
import { NestableItemBlock } from "@/classes/NestableItemBlock"
import getItemMapFromNestableConfig from "./getItemMapFromNestableConfig"

const setPageConfig = () => {
    const pageConfig: PageConfig = buildPageConfigFromNestableConfig(nestableConfig.config)
    editPageConfig.value = pageConfig
}
const setPageContent = () => {
    const pageContent: PageContent = buildPageContentFromNestableConfig(nestableConfig.config)
    editPageContent.value = pageContent
}
const updateDeletedItemsFromNestableConfig = () => {
    // reset
    toDeleteAreaConfigMap.value = new Map()
    toDeleteBlockConfigMap.value = new Map()

    // fill based on nestable config
    Object.values(toDeleteNestableItemMap.value).forEach((item: NestableItem) => {
        if (item instanceof NestableItemArea) {
            toDeleteAreaConfigMap.value.set(item.areaConfig_current.uuid, item.areaConfig_current)
            toDeleteAreaContentMap.value.set(item.areaContent_current.uuid, item.areaContent_current)
        } else if (item instanceof NestableItemBlock) {
            toDeleteBlockConfigMap.value.set(item.blockConfig_current.uuid, item.blockConfig_current)
            if (!item.blockContent_current) throw new Error("item.blockContent_current is undefined here, so probably an issue with having a new page without a current config")
            toDeleteBlockContentMap.value.set(item.blockContent_current.uuid, item.blockContent_current)
        } else {
            throw new Error("uuid has to be an area or a block, so what is this? UUID: " + item.id)
        }
    })

}
const updateNewItemsFromNestableConfig = () => {
    const nestableItemsMap: Map<string, NestableItem> = getItemMapFromNestableConfig(nestableConfig.config)
    // if any new item is not in main nestable config - delete them
    Object.keys(newAreaConfigMap.value).forEach((configUUID: string) => {
        if (!nestableItemsMap.has(configUUID)) {
            newAreaConfigMap.value.delete(configUUID)
        }
    })

}

const setDataFromNestableConfig = () => {
    setPageConfig()
    setPageContent()
    updateDeletedItemsFromNestableConfig()
    updateNewItemsFromNestableConfig()
}

export default setDataFromNestableConfig