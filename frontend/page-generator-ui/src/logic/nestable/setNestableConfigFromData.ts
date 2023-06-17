import generateNestableConfigFromPageConfig from "./generateNestableConfigFromPageConfig"
import generateNestableConfigFromToDeleteMaps from "./generateNestableConfigFromToDeleteMaps"
import {editPageConfig, toDeleteAreaConfigMap, toDeleteBlockConfigMap} from "@/state/pageConfigState"
import {nestableConfig} from "@/state/nestableState"
import type { NestableConfig } from "@/classes/NestableConfig"
import type { PageConfig } from "../../../../../page_cls_module/build_browser"

const setNestableConfigFromData = () => {
    const pageConfig: PageConfig | null = editPageConfig.value
    if (!pageConfig) throw new Error("pageConfig cannot be undefined")
    const newNestableConfig: NestableConfig = generateNestableConfigFromPageConfig(pageConfig)
    const toDeleteNestableItems: NestableConfig = generateNestableConfigFromToDeleteMaps(toDeleteAreaConfigMap.value, toDeleteBlockConfigMap.value)

    nestableConfig.config = newNestableConfig
    nestableConfig.toDelete = toDeleteNestableItems
}

export default setNestableConfigFromData