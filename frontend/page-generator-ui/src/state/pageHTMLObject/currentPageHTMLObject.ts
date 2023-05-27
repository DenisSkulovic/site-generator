import type { PageHTMLObject } from "../../../../../page_cls_module/src";
import {reactive} from "vue"

const currentPageHTMLObject: {value: PageHTMLObject | null} = reactive({
    value: null
})

export default currentPageHTMLObject