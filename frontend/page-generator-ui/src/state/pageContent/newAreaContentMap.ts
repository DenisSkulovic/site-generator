import {reactive} from "vue"
import type {AreaContent} from "../../../../../page_cls_module" 

type AreaContentUUID = string
const newAreaContentMap: {value: Map<AreaContentUUID, AreaContent>} = reactive({
    value: new Map()
})

export default newAreaContentMap