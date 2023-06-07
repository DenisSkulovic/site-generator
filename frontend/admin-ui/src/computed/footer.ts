import { footerConfigCurrent, footerConfigEdit } from "@/state/configState"
import { footerContentCurrent, footerContentEdit } from "@/state/contentState"
import { type ComputedRef, computed } from "vue"

export const isFooterContentEdited: ComputedRef<boolean> = computed(() => {
    return JSON.stringify(footerContentCurrent.value) !== JSON.stringify(footerContentEdit.value)
})
export const isFooterConfigEdited: ComputedRef<boolean> = computed(() => {
    return JSON.stringify(footerConfigCurrent.value) !== JSON.stringify(footerConfigEdit.value)
})
export const isFooterEdited: ComputedRef<boolean> = computed(() => {
    return isFooterContentEdited.value || isFooterConfigEdited.value
})