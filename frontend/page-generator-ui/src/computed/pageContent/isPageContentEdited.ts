import {computed} from "vue"
import type {ComputedRef} from "vue"
import {currentPageContent, editPageContent} from "../../state/pageContentState"

const isPageContentEdited: ComputedRef<boolean> = computed(() => {
    return JSON.stringify(currentPageContent.value) !== JSON.stringify(editPageContent.value)
})

export default isPageContentEdited