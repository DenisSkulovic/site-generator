import { AssetService, PageContentService, PageConfigService, PageHTMLObjectService, GeneratorService, PagemetaService, NestableService } from "@/service"
import adminUrl from "../state/adminUrl"
import bucketName from "../state/bucketName"
import lang from "../state/lang"
import pagePath from "../state/pagePath"
import { type ComputedRef, computed } from "vue"
import { PageVersionService } from "@/service/PageVersionService"

export const pageContentService: ComputedRef<PageContentService> = computed(() => {
    return new PageContentService(adminUrl.value, bucketName.value, pagePath.value)
})
export const pageConfigService: ComputedRef<PageConfigService> = computed(() => {
    return new PageConfigService(adminUrl.value, pagePath.value)
})
export const pageHTMLObjectService: ComputedRef<PageHTMLObjectService> = computed(() => {
    return new PageHTMLObjectService(adminUrl.value, bucketName.value, pagePath.value)
})
export const generatorService: ComputedRef<GeneratorService> = computed(() => {
    return new GeneratorService(adminUrl.value)
})
export const pagemetaService: ComputedRef<PagemetaService> = computed(() => {
    return new PagemetaService(adminUrl.value)
})
export const nestableService: ComputedRef<NestableService> = computed(() => {
    return new NestableService(adminUrl.value)
})
export const assetService: ComputedRef<AssetService> = computed(() => {
    return new AssetService(adminUrl.value, bucketName.value, pagePath.value)
})
export const pageVersionService: ComputedRef<PageVersionService> = computed(() => {
    return new PageVersionService(adminUrl.value, pagePath.value)
})
