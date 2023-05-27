import type {PageConfig} from "../../../../../page_cls_module/src"
import {reactive} from "vue"

const currentPageConfig: {value: PageConfig | null} = reactive({
    value: null
})

export default currentPageConfig