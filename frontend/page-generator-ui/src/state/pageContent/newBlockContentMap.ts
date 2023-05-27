import {reactive} from "vue"
import type {BlockContent} from "../../../../../page_cls_module" 

type BlockContentUUID = string
const newBlockContentMap: {value: Map<BlockContentUUID, BlockContent>} = reactive({
    value: new Map()
})

export default newBlockContentMap