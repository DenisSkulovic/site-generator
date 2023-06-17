import { computed } from "vue"
import type { ComputedRef } from "vue"
import type { AreaConfig } from "../../../../../page_cls_module/build_browser"
import {editPageConfig} from "../../state/pageConfigState"
import {processAreaConfig} from "./currentAreaConfigMap"

type AreaConfigUUID = string
type AreaConfigMap = Map<AreaConfigUUID, AreaConfig>


/**
 * edited means that it is based on the config clone that is being modified on the UI, and not a map of edited areas
 */
const editedAreaConfigMap: ComputedRef<AreaConfigMap> = computed(() => {
    const map: AreaConfigMap = new Map()
    if (!editPageConfig.value) return map

    editPageConfig.value.areaConfigArr.forEach((areaConfig: AreaConfig) => {
        processAreaConfig(areaConfig, map)
    })

    return map
})

export default editedAreaConfigMap