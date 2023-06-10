import type { PageHTMLObject } from "@page_cls_module";
import {reactive} from "vue"

export const currentPageHTMLObject: {value: PageHTMLObject | null} = reactive({
    value: null
})

export const editPageHTMLObject: {value: PageHTMLObject | null} = reactive({
    value: null
})