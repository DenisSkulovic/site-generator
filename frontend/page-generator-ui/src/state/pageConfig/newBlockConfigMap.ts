import {reactive} from "vue"
import type {BlockConfig} from "../../../../../page_cls_module" 

type BlockConfigUUID = string
const newBlockConfigMap: {value: Map<BlockConfigUUID, BlockConfig>} = reactive({
    value: new Map()
})

export default newBlockConfigMap