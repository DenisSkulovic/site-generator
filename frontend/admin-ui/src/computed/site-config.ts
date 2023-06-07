import { siteConfigCurrent, siteConfigEdit } from "@/state/configState"
import { type ComputedRef, computed } from "vue"

export const isSiteConfigEdited: ComputedRef<boolean> = computed(() => {
    return JSON.stringify(siteConfigCurrent.value) !== JSON.stringify(siteConfigEdit.value)
})