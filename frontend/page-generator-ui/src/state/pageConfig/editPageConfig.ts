import type {PageConfig} from "../../../../../page_cls_module/src"
import {reactive, ref} from "vue"

/**
 * THIS SHOULD NOT BE TOUCHED DIRECTLY, HANDLED AUTOMATICALLY BY LOGIC RELATED TO NESTABLE
 * ONLY TOUCH IF ACTION DOES NOT CONRECT THE NESTABLE FUNCTIONALITY,
 * IN WHICH CASE YOU WOULD HAVE TO MANUALLY UPDATE THE NESTABLE ARRAYS
 */
const editPageConfig: {value: PageConfig | null} = reactive({
    value: null
})

export default editPageConfig