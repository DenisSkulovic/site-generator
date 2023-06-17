import { computed } from "vue"
import type { ComputedRef } from "vue"
import { AreaContent, BlockContent } from "../../../../../page_cls_module/build_browser"
import {currentPageContent} from "../../state/pageContentState"

type AreaContentUUID = string
type AreaContentMap = Map<AreaContentUUID, AreaContent>

// recursion
export const processAreaContent = (areaContent: AreaContent, map: AreaContentMap) => {
    map.set(areaContent.uuid, areaContent)
    Object.values(areaContent.data).forEach((childContent: AreaContent | BlockContent) => {
        if (childContent instanceof AreaContent) {
            processAreaContent(childContent, map)
        } else if (childContent instanceof BlockContent) {
            return 
        }
    })
}

const currentAreaContentMap: ComputedRef<AreaContentMap> = computed(() => {
    const map: AreaContentMap = new Map()
    if (!currentPageContent.value) return map

    Object.values(currentPageContent.value.data).forEach((areaContent: AreaContent) => {
        processAreaContent(areaContent, map)
    })

    return map
})

export default currentAreaContentMap