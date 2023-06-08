import { reactive } from "vue"
import type { Product } from "@page_cls_module"

export const productsCurrent: { value: Product[] | null } = reactive({
    value: null,
})
export const productsEdit: { value: Product[] | null } = reactive({
    value: null,
})