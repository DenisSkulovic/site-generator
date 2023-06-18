import { AdminService } from "./AdminService"
import { AreaConfig, AreaContent, BlockConfig, BlockContent, PageConfig, PageContent } from "../../../../page_cls_module/build_browser"
import { NestableConfig } from "@/classes/NestableConfig"
import type { NestableItem } from "@/classes/NestableItem"
import { NestableItemArea } from "@/classes/NestableItemArea"
import { NestableItemBlock } from "@/classes/NestableItemBlock"
import toDeleteNestableItemMap from "@/computed/nestable/toDeleteNestableItemMap"
import { nestableConfig } from "@/state/nestableState"
import { editPageConfig, newAreaConfigMap, newBlockConfigMap, toDeleteAreaConfigMap, toDeleteBlockConfigMap } from "@/state/pageConfigState"
import { editPageContent, newAreaContentMap, newBlockContentMap, toDeleteAreaContentMap, toDeleteBlockContentMap } from "@/state/pageContentState"
import { cloneDeep } from "lodash"
import { reactive } from "vue"

export class NestableService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    buildPageConfigFromNestableConfig(nestableConfig: NestableConfig): PageConfig {
        if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
        const pageConfigClone: PageConfig = reactive(cloneDeep(editPageConfig.value))
        pageConfigClone.areaConfigArr = [] // clone, but empty the array
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
        nestableConfig.forEach((nestableItem: NestableItem) => {
            processItem(nestableItem, null, pageConfigClone)
        })
        return reactive(pageConfigClone)
    }

    buildPageContentFromNestableConfig(nestableConfig: NestableConfig) {
        if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined")
        const pageContentClone: PageContent = reactive(cloneDeep(editPageContent.value))
        pageContentClone.data = {} // clone, but empty the data object
        const processItem = (
            item: NestableItem,
            parentContentItem: AreaContent | null,
            pageContent: PageContent,
        ) => {
            if (item instanceof NestableItemArea) {
                const editItemClone: AreaContent = reactive(cloneDeep(item.areaContent_edit))
                editItemClone.data = {} // clone, but empty the data object
                if (!parentContentItem) pageContent.data[item.id] = editItemClone
                else parentContentItem.data[item.id] = editItemClone
                if (item.isNew) newAreaContentMap.value.set(editItemClone.uuid, editItemClone)
                item.children?.forEach((subitem) => {
                    processItem(subitem, editItemClone, pageContent)
                })
            } else if (item instanceof NestableItemBlock) {
                const editItemClone: BlockContent = reactive(cloneDeep(item.blockContent_edit))
                if (!parentContentItem) throw new Error("BlockContent cannot belong to PageContent, it must belong to an AreaContent")
                if (item.isNew) newBlockContentMap.value.set(editItemClone.uuid, editItemClone)
                parentContentItem.data[item.id] = editItemClone
            } else {
                throw new Error("item must be a Block or an Area content")
            }
        }
        nestableConfig.forEach((nestableItem: NestableItem) => {
            processItem(nestableItem, null, pageContentClone)
        })
        return reactive(pageContentClone)
    }

    generateNestableConfigFromPageConfig(pageConfig: PageConfig): NestableConfig {
        const nestableConfig: NestableConfig = reactive(new NestableConfig())
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
        pageConfig.areaConfigArr.forEach((areaConfig: AreaConfig) => {
            processItem(areaConfig, null, nestableConfig)
        })
        console.log(`nestableConfig`, nestableConfig)
        return nestableConfig
    }

    generateNestableConfigFromToDeleteMaps(
        toDeleteAreasMap: Map<string, AreaConfig>,
        toDeleteBlocksMap: Map<string, BlockConfig>,
    ): NestableConfig {
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


    getItemMapFromNestableConfig(config: NestableConfig) {
        const map: Map<string, NestableItem> = new Map()

        const processItem = (item: NestableItem, map: Map<string, NestableItem>) => {
            map.set(item.id, item)
            item.children.forEach((subitem: NestableItem) => {
                processItem(subitem, map)
            })
        }
        config.forEach((item: NestableItem) => {
            processItem(item, map)
        });

        return map
    }


    setDataFromNestableConfig(): void {
        const setPageConfig = () => {
            const pageConfig: PageConfig = this.buildPageConfigFromNestableConfig(nestableConfig.config)
            editPageConfig.value = pageConfig
        }
        const setPageContent = () => {
            const pageContent: PageContent = this.buildPageContentFromNestableConfig(nestableConfig.config)
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
            const nestableItemsMap: Map<string, NestableItem> = this.getItemMapFromNestableConfig(nestableConfig.config)
            // if any new item is not in main nestable config - delete them
            Object.keys(newAreaConfigMap.value).forEach((configUUID: string) => {
                if (!nestableItemsMap.has(configUUID)) {
                    newAreaConfigMap.value.delete(configUUID)
                }
            })

        }
        setPageConfig()
        setPageContent()
        updateDeletedItemsFromNestableConfig()
        updateNewItemsFromNestableConfig()
    }

    setNestableConfigFromData(): void {
        const pageConfig: PageConfig | null = editPageConfig.value
        if (!pageConfig) throw new Error("pageConfig cannot be undefined")
        const newNestableConfig: NestableConfig = this.generateNestableConfigFromPageConfig(pageConfig)
        const toDeleteNestableItems: NestableConfig = this.generateNestableConfigFromToDeleteMaps(toDeleteAreaConfigMap.value, toDeleteBlockConfigMap.value)

        nestableConfig.config = newNestableConfig
        nestableConfig.toDelete = toDeleteNestableItems
    }

}
