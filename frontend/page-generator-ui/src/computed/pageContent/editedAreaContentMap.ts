import { computed } from "vue"
import type {ComputedRef} from "vue"
import type { AreaContent } from "../../../../../page_cls_module/src"
import {editPageContent} from "../../state/pageContentState"
import {processAreaContent} from "./currentAreaContentMap"

type AreaContentUUID = string
type AreaContentMap = Map<AreaContentUUID, AreaContent>

/**
 * edited means that it is based on the content clone that is being modified on the UI, and not a map of edited areas
 */
const editedAreaContentMap: ComputedRef<AreaContentMap> = computed(() => {
    const map: AreaContentMap = new Map()
    if (!editPageContent.value) return map

    Object.values(editPageContent.value.data).forEach((areaContent: AreaContent) => {
        processAreaContent(areaContent, map)
    })

    return map
})

export default editedAreaContentMap