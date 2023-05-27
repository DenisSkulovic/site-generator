import {computed} from "vue"
import type {ComputedRef} from "vue"
import currentPageContent from "../../state/pageContent/currentPageContent"
import editPageContent from "../../state/pageContent/editPageContent"

const isPageContentEdited: ComputedRef<boolean> = computed(() => {
    return JSON.stringify(currentPageContent.value) === JSON.stringify(editPageContent.value)
})

export default isPageContentEdited