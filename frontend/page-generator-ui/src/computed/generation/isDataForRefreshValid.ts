import {computed} from "vue"
import type {ComputedRef} from "vue"
import nestableItemMap from "../../computed/nestable/nestableItemMap"
import {NestableItemArea} from "../../classes/NestableItemArea"

const isDataForRefreshValid: ComputedRef<boolean> = computed(() => {
    for (const item of nestableItemMap.value.values()) {
        if (item instanceof NestableItemArea) {
            if (item.slotsMax && (item.isSlotsTooMany || item.isHaveSlotsAvailable)) return false
        }
    }
    return true
})

export default isDataForRefreshValid