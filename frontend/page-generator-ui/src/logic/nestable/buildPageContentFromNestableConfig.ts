import type { NestableConfig } from "../../classes/NestableConfig";
import {editPageContent} from "../../state/pageContentState"
import type { PageContent, AreaContent, BlockContent } from "../../../../../page_cls_module"
import { cloneDeep } from "lodash"
import type { NestableItem } from "../../classes/NestableItem";
import { NestableItemArea } from "@/classes/NestableItemArea";
import { NestableItemBlock } from "@/classes/NestableItemBlock";
import {reactive} from "vue"

import {newAreaContentMap, newBlockContentMap} from "@/state/pageContentState"

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


const buildPageContentFromNestableConfig = (nestableConfig: NestableConfig) => {
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined")
    const pageContentClone: PageContent = reactive(cloneDeep(editPageContent.value))
    pageContentClone.data = {} // clone, but empty the data object
    nestableConfig.forEach((nestableItem: NestableItem) => {
        processItem(nestableItem, null, pageContentClone)
    })
    return reactive(pageContentClone)
}

export default buildPageContentFromNestableConfig