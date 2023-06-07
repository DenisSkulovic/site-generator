import { reactive } from "vue"
import type { FooterConfig, HeaderConfig } from "@page_cls_module"
import type { SiteConfig } from "@admin_cls_module"

export const siteConfigEdit: { value: SiteConfig | null } = reactive({
    value: null
})

export const footerConfigEdit: { value: FooterConfig | null } = reactive({
    value: null,
})

export const headerConfigEdit: { value: HeaderConfig | null } = reactive({
    value: null,
})

export const siteConfigCurrent: { value: SiteConfig | null } = reactive({
    value: null
})

export const footerConfigCurrent: { value: FooterConfig | null } = reactive({
    value: null,
})

export const headerConfigCurrent: { value: HeaderConfig | null } = reactive({
    value: null,
})