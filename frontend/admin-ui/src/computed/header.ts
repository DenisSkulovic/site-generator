import { headerConfigCurrent, headerConfigEdit } from "@/state/configState"
import { headerContentCurrent, headerContentEdit } from "@/state/contentState"
import { type ComputedRef, computed } from "vue"

export const isHeaderContentEdited: ComputedRef<boolean> = computed(() => {
    return JSON.stringify(headerContentCurrent.value) !== JSON.stringify(headerContentEdit.value)
})
export const isHeaderConfigEdited: ComputedRef<boolean> = computed(() => {
    return JSON.stringify(headerConfigCurrent.value) !== JSON.stringify(headerConfigEdit.value)
})
export const isHeaderEdited: ComputedRef<boolean> = computed(() => {
    return isHeaderContentEdited.value || isHeaderConfigEdited.value
})