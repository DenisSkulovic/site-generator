import type {FooterContent, HeaderContent} from "@page_cls_module"
import { reactive } from "vue"

export const footerContentCurrent: { value: FooterContent | null } = reactive({
    value: null,
})
export const footerContentEdit: { value: FooterContent | null } = reactive({
    value: null,
})

export const headerContentCurrent: { value: HeaderContent | null } = reactive({
    value: null,
})
export const headerContentEdit: { value: HeaderContent | null } = reactive({
    value: null,
})