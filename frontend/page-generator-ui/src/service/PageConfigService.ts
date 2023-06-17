import axios from "axios"
import { AdminService } from "./AdminService"
import { PageConfig } from "../../../../page_cls_module/build_browser"
import { Asset, PageConfigMetadata, buildPageConfig } from "../../../../page_cls_module/build_browser"
import { reactive } from "vue"
import type { AreaConfig, BootstrapVersionEnum, HeadVersionEnum, LangEnum, SkeletonVersionEnum } from "../../../../page_cls_module/build_browser"
import defaultFields from "../config/defaultFields/pageConfig"
import getUUID from "../utils/getUUID"
import { editPageConfig, currentPageConfig } from "@/state/pageConfigState"
import _ from "lodash"

export type S3Path = string
export class PageConfigService extends AdminService {
    bucketName: string
    pagePath: string
    constructor(adminUrl: string, bucketName: string, pagePath: string) {
        super(adminUrl)
        this.bucketName = bucketName
        this.pagePath = pagePath
    }

    async getConfig(config_uuid: string): Promise<PageConfig> {
        const headers = {
            "Content-Type": "application/json"
        }
        const url = `${this.adminUrl}/page-config/${config_uuid}`
        const { data } = await axios.get(
            url,
            {
                headers
            }
        )
        const pageConfig: PageConfig = buildPageConfig(data)
        return pageConfig
    }

    async putConfig(pageConfig: PageConfig): Promise<PageConfig> {
        const headers = {
            "Content-Type": "application/json"
        }
        const body: PageConfig = pageConfig
        const config_uuid: string = pageConfig.uuid
        const url = `${this.adminUrl}/page-config/${config_uuid}`
        const { data } = await axios.put(
            url,
            body,
            {
                headers
            }
        )
        const respPageConfig: PageConfig = buildPageConfig(data)
        return respPageConfig
    }

    resetPageConfig() {
        const clone: PageConfig | null = _.cloneDeep(currentPageConfig.value)
        editPageConfig.value = clone
    }

    setPageConfig(obj: PageConfig) {
        currentPageConfig.value = obj
        this.resetPageConfig()
    }

    getNewPageConfig(
        pageContentUUID: string,
    ): PageConfig {
        const VITE_APP_DEFAULT_HEADER_ID = import.meta.env.VITE_APP_DEFAULT_HEADER_ID
        const VITE_APP_DEFAULT_FOOTER_ID = import.meta.env.VITE_APP_DEFAULT_FOOTER_ID
        if (!VITE_APP_DEFAULT_HEADER_ID) throw new Error("VITE_APP_DEFAULT_HEADER_ID is a mandatory env param")
        if (!VITE_APP_DEFAULT_FOOTER_ID) throw new Error("VITE_APP_DEFAULT_FOOTER_ID is a mandatory env param")

        const now = Date.now()
        const createdTimestamp = now
        const updatedTimestamp = now
        const uuid: string = getUUID()
        const lang: LangEnum = defaultFields.lang
        const pageName: string = defaultFields.pageName
        const pagePath: string = ""
        const contentId: string = pageContentUUID
        const isIncludeBootstrap: boolean = defaultFields.isIncludeBootstrap
        const headVersion: HeadVersionEnum = defaultFields.headVersion
        const bootstrapVersion: BootstrapVersionEnum = defaultFields.bootstrapVersion
        const templateVersion: SkeletonVersionEnum = defaultFields.templateVersion
        const areaConfigArr: AreaConfig[] = []
        const assets: Asset[] = []
        const metadata: PageConfigMetadata = reactive(new PageConfigMetadata(
            createdTimestamp,
            updatedTimestamp,
        ))

        const obj: PageConfig = reactive(new PageConfig(
            uuid,
            lang,
            pageName,
            pagePath,
            contentId,
            isIncludeBootstrap,
            headVersion,
            bootstrapVersion,
            templateVersion,
            areaConfigArr,
            assets,
            metadata,
        ))
        return obj

    }
}
