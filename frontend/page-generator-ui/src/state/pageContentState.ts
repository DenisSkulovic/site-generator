import type {AreaContent, BlockContent, PageContent} from "../../../../page_cls_module/build_browser"
import {reactive} from "vue"
import * as _ from "lodash"

export const currentPageContent: {value: PageContent | null} = reactive({
    value: null
})

export const editPageContent: {value: PageContent | null} = reactive({
    value: null
})

type AreaContentUUID = string
export const newAreaContentMap: {value: Map<AreaContentUUID, AreaContent>} = reactive({
    value: new Map()
})

type BlockContentUUID = string
export const newBlockContentMap: {value: Map<BlockContentUUID, BlockContent>} = reactive({
    value: new Map()
})

export const toDeleteAreaContentMap: {value: Map<string, AreaContent>} = reactive({
    value: new Map()
})

export const toDeleteBlockContentMap: {value: Map<string, BlockContent>} = reactive({
    value: new Map()
})