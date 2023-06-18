import getNewAreaConfig from "../areaConfig/getNewAreaConfig"
import getNewAreaContent from "../areaContent/getNewAreaContent"
import type { AreaConfig, AreaContent } from "../../../../../page_cls_module/build_browser"
import {editPageConfig, newAreaConfigMap} from "../../state/pageConfigState"
import {editPageContent, newAreaContentMap} from "../../state/pageContentState"
import type {NestableConfig} from "../../classes/NestableConfig"

import { NestableItemArea } from "@/classes/NestableItemArea"
import idToIdMap from "../../state/idToIdMap"
import { nestableService } from "@/computed/services";

const handleAddNewArea = (
    nestableArr: NestableConfig
) => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined")

    const newAreaConfig: AreaConfig = getNewAreaConfig()
    const newAreaContent: AreaContent = getNewAreaContent()

    // record the new area
    newAreaConfigMap.value.set(newAreaConfig.uuid, newAreaConfig)
    newAreaContentMap.value.set(newAreaContent.uuid, newAreaContent)
    idToIdMap.value.set(newAreaConfig.uuid, newAreaContent.uuid)
    idToIdMap.value.set(newAreaContent.uuid, newAreaConfig.uuid)

    const newNestableItem: NestableItemArea = new NestableItemArea(
        newAreaConfig.uuid,
        []
    )

    nestableArr?.push(newNestableItem)

    nestableService.value.setDataFromNestableConfig()
}

export default handleAddNewArea