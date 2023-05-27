import {reactive} from "vue"
import type { AreaConfig } from "../../../../../page_cls_module/src"

const toDeleteAreaConfigMap: {value: Map<string, AreaConfig>} = reactive({
    value: new Map()
})

export default toDeleteAreaConfigMap