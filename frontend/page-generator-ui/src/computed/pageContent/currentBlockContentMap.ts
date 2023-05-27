import { computed } from "vue"
import type { ComputedRef } from "vue"
import { AreaContent, BlockContent } from "../../../../../page_cls_module/src"
import currentPageContent from "../../state/pageContent/currentPageContent"

type BlockContentUUID = string
type BlockContentMap = Map<BlockContentUUID, BlockContent>

// recursion
export const processAreaContent = (areaContent: AreaContent, map: BlockContentMap) => {
    Object.values(areaContent.data).forEach((childContent: AreaContent | BlockContent) => {
        if (childContent instanceof AreaContent) {
            processAreaContent(childContent, map)
        } else if (childContent instanceof BlockContent) {
            map.set(childContent.uuid, childContent)
        }
    })

}

const currentBlockContentMap: ComputedRef<BlockContentMap> = computed(() => {
    const map: BlockContentMap = new Map()
    if (!currentPageContent.value) return map

    Object.values(currentPageContent.value.data).forEach((areaContent: AreaContent) => {
        processAreaContent(areaContent, map)
    })

    return map
})

export default currentBlockContentMap