import { computed } from "vue"
import type { ComputedRef } from "vue"
import type{ AreaContent, BlockContent } from "../../../../../page_cls_module/src"
import editPageContent from "../../state/pageContent/editPageContent"
import {processAreaContent} from "./currentBlockContentMap"

type BlockContentUUID = string
type BlockContentMap = Map<BlockContentUUID, BlockContent>

/**
 *  edited means that it is based on the content clone that is being modified on the UI, and not a map of edited blocks
 */
const editedBlockContentMap: ComputedRef<BlockContentMap> = computed(() => {
    const map: BlockContentMap = new Map()
    if (!editPageContent.value) return map

    Object.values(editPageContent.value.data).forEach((areaContent: AreaContent) => {
        processAreaContent(areaContent, map)
    })

    return map
})

export default editedBlockContentMap