import type { PageHTMLObject } from "../../../../page_cls_module/build_browser";
import {reactive} from "vue"

export const currentPageHTMLObject: {value: PageHTMLObject | null} = reactive({
    value: null
})

export const editPageHTMLObject: {value: PageHTMLObject | null} = reactive({
    value: null
})