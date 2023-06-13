import {computed} from "vue"
import type {ComputedRef} from "vue"
import {currentPageConfig} from "../../state/pageConfigState"
import {editPageConfig} from "../../state/pageConfigState"
import {cloneDeep} from "lodash"
import type { PageConfig } from "../../../../../page_cls_module/src"

const isPageConfigEdited: ComputedRef<boolean> = computed(() => {
    if (!currentPageConfig.value || !editPageConfig.value) return false
    const currentClone: PageConfig = cloneDeep(currentPageConfig.value)
    const editClone: PageConfig = cloneDeep(editPageConfig.value)
    currentClone['areaConfigArr'] = [] // we dont care about subitems, only config fields
    editClone['areaConfigArr'] = [] // we dont care about subitems, only config fields
    return JSON.stringify(currentClone) !== JSON.stringify(editClone)
})

export default isPageConfigEdited