import { reactive } from "vue"
import type { PageHTMLObject } from "@page_cls_module"

export const pagesCurrent: { value: PageHTMLObject[] | null } = reactive({
    value: null,
})
export const pagesEdit: { value: PageHTMLObject[] | null } = reactive({
    value: null,
})
