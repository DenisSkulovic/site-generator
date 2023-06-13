import generateNestableConfigFromPageConfig from "./generateNestableConfigFromPageConfig"
import generateNestableConfigFromToDeleteMaps from "./generateNestableConfigFromToDeleteMaps"
import {editPageConfig} from "@/state/pageConfigState"
import {nestableConfig} from "@/state/nestableState"
import type { NestableConfig } from "@/classes/NestableConfig"
import {toDeleteAreaConfigMap} from "@/state/pageConfigState"
import {toDeleteBlockConfigMap} from "@/state/pageConfigState"

const setNestableConfigFromData = () => {
    const pageConfig = editPageConfig.value
    if (!pageConfig) throw new Error("pageConfig cannot be undefined")
    const newNestableConfig: NestableConfig = generateNestableConfigFromPageConfig(pageConfig)
    const toDeleteNestableItems: NestableConfig = generateNestableConfigFromToDeleteMaps(toDeleteAreaConfigMap.value, toDeleteBlockConfigMap.value)

    nestableConfig.config = newNestableConfig
    nestableConfig.toDelete = toDeleteNestableItems
}

export default setNestableConfigFromData