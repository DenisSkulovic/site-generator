import { computed } from "vue"
import type { ComputedRef } from "vue"
import type { AreaConfig, BlockConfig } from "../../../../../page_cls_module/src"
import editPageConfig from "../../state/pageConfig/editPageConfig"
import {processConfig} from "./currentBlockConfigMap"

type BlockConfigUUID = string
type BlockConfigMap = Map<BlockConfigUUID, BlockConfig>

/**
 * edited means that it is based on the config clone that is being modified on the UI, and not a map of edited blocks
 */
const editedBlockConfigMap: ComputedRef<BlockConfigMap> = computed(() => {
    const map: BlockConfigMap = new Map()
    if (!editPageConfig.value) return map

    editPageConfig.value.areaConfigArr.forEach((areaConfig: AreaConfig) => {
        processConfig(areaConfig, map)
    })

    return map
})

export default editedBlockConfigMap