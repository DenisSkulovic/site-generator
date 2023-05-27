import {reactive} from "vue"
import type { AreaContent } from "../../../../../page_cls_module/src"

const toDeleteAreaContentMap: {value: Map<string, AreaContent>} = reactive({
    value: new Map()
})

export default toDeleteAreaContentMap