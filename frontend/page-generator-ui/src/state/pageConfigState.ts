import type { AreaConfig, BlockConfig, PageConfig } from "@page_cls_module"
import { reactive } from "vue"

export const currentPageConfig: { value: PageConfig | null } = reactive({
    value: null
})

export const editPageConfig: { value: PageConfig | null } = reactive({
    value: null
})

type AreaConfigUUID = string
export const newAreaConfigMap: { value: Map<AreaConfigUUID, AreaConfig> } = reactive({
    value: new Map()
})

type BlockConfigUUID = string
export const newBlockConfigMap: { value: Map<BlockConfigUUID, BlockConfig> } = reactive({
    value: new Map()
})

export const toDeleteAreaConfigMap: { value: Map<string, AreaConfig> } = reactive({
    value: new Map()
})

export const toDeleteBlockConfigMap: { value: Map<string, BlockConfig> } = reactive({
    value: new Map()
})