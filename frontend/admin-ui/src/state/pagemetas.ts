import { reactive } from "vue"
import type { Pagemeta } from "@admin_cls_module"

export const pagemetasCurrent: { value: Pagemeta[] | null } = reactive({
    value: null,
})
export const pagemetasEdit: { value: Pagemeta[] | null } = reactive({
    value: null,
})
