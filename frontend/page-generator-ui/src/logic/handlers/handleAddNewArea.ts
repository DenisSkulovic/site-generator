import getNewAreaConfig from "../areaConfig/getNewAreaConfig"
import getNewAreaContent from "../areaContent/getNewAreaContent"
import type { AreaConfig, AreaContent } from "../../../../../page_cls_module"
import editPageConfig from "../../state/pageConfig/editPageConfig"
import editPageContent from "../../state/pageContent/editPageContent"
import type {NestableConfig} from "../../classes/NestableConfig"

import newAreaContentMap from "../../state/pageContent/newAreaContentMap"
import newAreaConfigMap from "../../state/pageConfig/newAreaConfigMap"
import { NestableItemArea } from "@/classes/NestableItemArea"
import setDataFromNestableConfig from "../nestable/setDataFromNestableConfig"
import idToIdMap from "../../state/idToIdMap"

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

    setDataFromNestableConfig()
}

export default handleAddNewArea