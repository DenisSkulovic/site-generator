import { computed } from "vue"
import type { ComputedRef } from "vue"
import { AreaConfig, BlockConfig } from "../../../../../page_cls_module/build_browser"
import {currentPageConfig} from "../../state/pageConfigState"

type AreaConfigUUID = string
type AreaConfigMap = Map<AreaConfigUUID, AreaConfig>

// recursion
export const processAreaConfig = (areaConfig: AreaConfig, map: AreaConfigMap) => {
    map.set(areaConfig.uuid, areaConfig)
    areaConfig.childConfigArr.forEach((childConfig: AreaConfig | BlockConfig) => {
        if (childConfig instanceof AreaConfig) {
            processAreaConfig(childConfig, map)
        } else if (childConfig instanceof BlockConfig) {
            return
        }
    })
}

const currentAreaConfigMap: ComputedRef<AreaConfigMap> = computed(() => {
    const map: AreaConfigMap = new Map()
    if (!currentPageConfig.value) return map

    currentPageConfig.value.areaConfigArr.forEach((areaConfig: AreaConfig) => {
        processAreaConfig(areaConfig, map)
    })

    return map
})

export default currentAreaConfigMap