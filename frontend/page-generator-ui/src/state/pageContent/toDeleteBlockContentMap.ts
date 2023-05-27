import {reactive} from "vue"
import type { BlockContent } from "../../../../../page_cls_module/src"

const toDeleteBlockContentMap: {value: Map<string, BlockContent>} = reactive({
    value: new Map()
})

export default toDeleteBlockContentMap