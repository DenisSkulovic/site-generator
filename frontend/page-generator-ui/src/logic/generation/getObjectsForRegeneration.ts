import nestableConfig from "@/state/nestable/nestableConfig"
import { GeneratePageRequest, type AreaConfig, type AreaContent, type BlockConfig, type BlockContent, GenerateAreaRequest, GenerateBlockRequest, type PageConfig, type PageContent } from "../../../../../page_cls_module/src"
import editPageConfig from "@/state/pageConfig/editPageConfig"
import editPageContent from "@/state/pageContent/editPageContent"
import lastRenderedData from "@/state/lastRenderedData"
import type { NestableItem } from "@/classes/NestableItem"
import { NestableItemArea } from "@/classes/NestableItemArea"
import { NestableItemBlock } from "@/classes/NestableItemBlock"
import editedAreaConfigMap from "@/computed/pageConfig/editedAreaConfigMap"
import editedAreaContentMap from "@/computed/pageContent/editedAreaContentMap"
import editedBlockConfigMap from "@/computed/pageConfig/editedBlockConfigMap"
import editedBlockContentMap from "@/computed/pageContent/editedBlockContentMap"


type GenerateObjects = {
    page?: GeneratePageRequest,
    areas?: GenerateAreaRequest[],
    blocks?: GenerateBlockRequest[],

}

const getIsNeedToRegeneratePage = (
    renderedPageConfig: PageConfig | null,
    editPageConfig: PageConfig,
): boolean => {
    // check some fields
    if (editPageConfig.bootstrapVersion !== renderedPageConfig?.bootstrapVersion) return true
    if (editPageConfig.templateVersion !== renderedPageConfig?.templateVersion) return true
    if (editPageConfig.headVersion !== renderedPageConfig?.headVersion) return true
    if (editPageConfig.isIncludeBootstrap !== renderedPageConfig?.isIncludeBootstrap) return true

    // check if the order of items was changed, or some items were added or deleted
    for (let i = 0; i < editPageConfig.areaConfigArr.length; i++ ) {
        const editItem = editPageConfig.areaConfigArr[i]
        const renderedItem = renderedPageConfig.areaConfigArr[i]
        if (editItem.uuid !== renderedItem.uuid) return true
    }
    return false
}
const getIsNeedToRegenerateArea = (
    renderedAreaConfig: AreaConfig | null,
    editAreaConfig: AreaConfig,
    renderedAreaContent: AreaContent | null,
    editAreaContent: AreaContent,
): boolean => {
    // check some fields
    if (editAreaConfig.isIncludeContainer !== renderedAreaConfig?.isIncludeContainer) return true
    if (editAreaConfig.areaTemplateName !== renderedAreaConfig?.areaTemplateName) return true
    if (editAreaConfig.bootstrapVersion !== renderedAreaConfig?.bootstrapVersion) return true

    // check if the order of items was changed, or some items were added or deleted
    for (let i = 0; i < editAreaConfig.childConfigArr.length; i++ ) {
        const editItem = editAreaConfig.childConfigArr[i]
        const renderedItem = renderedAreaConfig.childConfigArr[i]
        if (editItem.uuid !== renderedItem.uuid) return true
    }

    // check content
    // TODO

    return false
}
const getIsNeedToRegenerateBlock = (
    renderedBlockConfig: BlockConfig | null,
    editBlockConfig: BlockConfig,
    renderedBlockContent: BlockContent | null,
    editBlockContent: BlockContent,

): boolean => {
    // check some fields
    if (editBlockConfig.bootstrapVersion !== renderedBlockConfig?.bootstrapVersion) return true
    if (editBlockConfig.blockTemplateName !== renderedBlockConfig?.blockTemplateName) return true

    // check content
    // TODO

    return false
}



const processNestableItem = (nestableItem: NestableItem, obj: GenerateObjects) => {
    if (nestableItem instanceof NestableItemArea) {
        const renderedAreaConfig: AreaConfig | undefined = lastRenderedData.areaConfigMap?.get(nestableItem.id)
        const renderedAreaContent: AreaContent | undefined = lastRenderedData.areaContentMap?.get(nestableItem.contentId)
        if (!renderedAreaConfig) throw new Error("renderedAreaConfig cannot be undefined")
        if (!renderedAreaContent) throw new Error("renderedAreaContent cannot be undefined")

        const editAreaConfig: AreaConfig | undefined = editedAreaConfigMap.value.get(nestableItem.id)
        const editAreaContent: AreaContent | undefined = editedAreaContentMap.value.get(nestableItem.contentId)
        if (!editAreaConfig) throw new Error("editAreaConfig cannot be undefined")
        if (!editAreaContent) throw new Error("editAreaContent cannot be undefined")

        const isNeedToRegenArea: boolean = getIsNeedToRegenerateArea(
            renderedAreaConfig,
            editAreaConfig,
            renderedAreaContent,
            editAreaContent,
        )
        console.log(`isNeedToRegenArea`, isNeedToRegenArea)
        if (isNeedToRegenArea) {
            const req = new GenerateAreaRequest(
                nestableItem.areaContent_edit,
                nestableItem.areaConfig_edit
            )
            if (!obj.areas) obj.areas = []
            obj.areas.push(req)
        } else {
            nestableItem.children.forEach((childNestableItem: NestableItem) => {
                processNestableItem(childNestableItem, obj)
            })
        }
    } else if (nestableItem instanceof NestableItemBlock) {
        const renderedBlockConfig: BlockConfig | undefined = lastRenderedData.blockConfigMap?.get(nestableItem.id)
        const renderedBlockContent: BlockContent | undefined = lastRenderedData.blockContentMap?.get(nestableItem.contentId)
        if (!renderedBlockConfig) throw new Error("renderedBlockConfig cannot be undefined")
        if (!renderedBlockContent) throw new Error("renderedBlockContent cannot be undefined")

        const editBlockConfig: BlockConfig | undefined = editedBlockConfigMap.value.get(nestableItem.id)
        const editBlockContent: BlockContent | undefined = editedBlockContentMap.value.get(nestableItem.contentId)
        if (!editBlockConfig) throw new Error("editBlockConfig cannot be undefined")
        if (!editBlockContent) throw new Error("editBlockContent cannot be undefined")

        const isNeedToRegenBlock: boolean = getIsNeedToRegenerateBlock(
            renderedBlockConfig,
            editBlockConfig,
            renderedBlockContent,
            editBlockContent,
        )
        console.log(`isNeedToRegenBlock`, isNeedToRegenBlock)
        if (isNeedToRegenBlock) {
            const req = new GenerateBlockRequest(
                nestableItem.blockContent_edit,
                nestableItem.blockConfig_edit
            )
            if (!obj.blocks) obj.blocks = []
            obj.blocks.push(req)
        }
    } else {
        throw new Error("what is this code, it makes no sense")
    }
}

const getObjectsForRegeneration = (): GenerateObjects => {
    const obj: GenerateObjects = {}

    const renderedPageConfig = lastRenderedData.config

    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be null")
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be null")

    const isNeedToRegenPage: boolean = getIsNeedToRegeneratePage(
        renderedPageConfig,
        editPageConfig.value,
    )

    console.log(`isNeedToRegenPage`, isNeedToRegenPage)

    if (isNeedToRegenPage) {
        obj.page = new GeneratePageRequest(
            editPageContent.value,
            editPageConfig.value,
        )
        return obj
    } else {
        nestableConfig.config.forEach((nestableItem: NestableItem) => {
            processNestableItem(nestableItem, obj)
        })  

        return obj
    }
}

export default getObjectsForRegeneration