import getNewBlockConfig from "../blockConfig/getNewBlockConfig"
import getNewBlockContent from "../blockContent/getNewBlockContent"
import type { BlockConfig, BlockContent } from "../../../../../page_cls_module"
import {editPageConfig, newBlockConfigMap} from "../../state/pageConfigState"
import {editPageContent, newBlockContentMap} from "../../state/pageContentState"
import type {NestableConfig} from "../../classes/NestableConfig"

import { NestableItemBlock } from "@/classes/NestableItemBlock"
import setDataFromNestableConfig from "../nestable/setDataFromNestableConfig"
import idToIdMap from "../../state/idToIdMap"
import defaultBlockFieldMap from "../../config/defaultFields/blockContent"
import {cloneDeep} from "lodash"

const handleAddNewBlock = (
    nestableArr: NestableConfig
) => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined")

    const newBlockConfig: BlockConfig = getNewBlockConfig()
    const newBlockContent: BlockContent = getNewBlockContent()

    const defaultFields = defaultBlockFieldMap.get(newBlockConfig.blockTemplateName)
    if (defaultFields) {
        newBlockContent.data = cloneDeep(defaultFields)
    }

    // record the new block
    newBlockConfigMap.value.set(newBlockConfig.uuid, newBlockConfig)
    newBlockContentMap.value.set(newBlockContent.uuid, newBlockContent)
    idToIdMap.value.set(newBlockConfig.uuid, newBlockContent.uuid)
    idToIdMap.value.set(newBlockContent.uuid, newBlockConfig.uuid)

    const newNestableItem: NestableItemBlock = new NestableItemBlock(
        newBlockConfig.uuid,
        []
    )

    nestableArr?.push(newNestableItem)

    setDataFromNestableConfig()
}

export default handleAddNewBlock