import {reactive} from "vue"
import type {AreaConfig} from "../../../../../page_cls_module" 

type AreaConfigUUID = string
const newAreaConfigMap: {value: Map<AreaConfigUUID, AreaConfig>} = reactive({
    value: new Map()
})

export default newAreaConfigMap