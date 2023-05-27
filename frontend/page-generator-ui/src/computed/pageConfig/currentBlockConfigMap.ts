import { computed } from "vue"
import type { ComputedRef } from "vue"
import { AreaConfig, BlockConfig } from "../../../../../page_cls_module/src"
import currentPageConfig from "../../state/pageConfig/currentPageConfig"

type BlockConfigUUID = string
type BlockConfigMap = Map<BlockConfigUUID, BlockConfig>

// recursion
export const processConfig = (childConfig: AreaConfig | BlockConfig, map: BlockConfigMap) => {
    if (childConfig instanceof BlockConfig) {
        map.set(childConfig.uuid, childConfig)
        return
    } else if (childConfig instanceof AreaConfig) {
        childConfig.childConfigArr.forEach((childChildConfig: AreaConfig | BlockConfig) =>{
            processConfig(childChildConfig, map)
        })
    }
}

const currentBlockConfigMap: ComputedRef<BlockConfigMap> = computed(() => {
    const map: BlockConfigMap = new Map()
    if (!currentPageConfig.value) return map

    currentPageConfig.value.areaConfigArr.forEach((areaConfig: AreaConfig) => {
        processConfig(areaConfig, map)
    })

    return map
})

export default currentBlockConfigMap