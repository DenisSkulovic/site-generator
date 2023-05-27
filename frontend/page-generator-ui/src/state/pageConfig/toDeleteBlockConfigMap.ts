import {reactive} from "vue"
import type { BlockConfig } from "../../../../../page_cls_module/src"

const toDeleteBlockConfigMap: {value: Map<string, BlockConfig>} = reactive({
    value: new Map()
})

export default toDeleteBlockConfigMap