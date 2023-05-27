import generateNestableConfigFromPageConfig from "./generateNestableConfigFromPageConfig"
import generateNestableConfigFromToDeleteMaps from "./generateNestableConfigFromToDeleteMaps"
import editPageConfig from "@/state/pageConfig/editPageConfig"
import nestableConfig from "@/state/nestable/nestableConfig"
import type { NestableConfig } from "@/classes/NestableConfig"
import toDeleteAreaConfigMap from "@/state/pageConfig/toDeleteAreaConfigMap"
import toDeleteBlockConfigMap from "@/state/pageConfig/toDeleteBlockConfigMap"

const setNestableConfigFromData = () => {
    const pageConfig = editPageConfig.value
    if (!pageConfig) throw new Error("pageConfig cannot be undefined")
    const newNestableConfig: NestableConfig = generateNestableConfigFromPageConfig(pageConfig)
    const toDeleteNestableItems: NestableConfig = generateNestableConfigFromToDeleteMaps(toDeleteAreaConfigMap.value, toDeleteBlockConfigMap.value)

    nestableConfig.config = newNestableConfig
    nestableConfig.toDelete = toDeleteNestableItems
}

export default setNestableConfigFromData