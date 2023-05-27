import { reactive } from "vue"
import { PageConfig, PageConfigMetadata } from "../../../../../page_cls_module"
import type { AreaConfig, BootstrapVersionEnum, HeadVersionEnum, LangEnum, SkeletonVersionEnum } from "../../../../../page_cls_module"
import defaultFields from "../../config/defaultFields/pageConfig"
import getUUID from "../../utils/getUUID"


const getNewPageConfig = (
    pageContentUUID: string,
): PageConfig => {
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
    const contentId: string = pageContentUUID
    const isIncludeBootstrap: boolean = defaultFields.isIncludeBootstrap
    const headVersion: HeadVersionEnum = defaultFields.headVersion
    const bootstrapVersion: BootstrapVersionEnum = defaultFields.bootstrapVersion
    const templateVersion: SkeletonVersionEnum = defaultFields.templateVersion
    const headerId: string = VITE_APP_DEFAULT_HEADER_ID
    const areaConfigArr: AreaConfig[] = []
    const footerId: string = VITE_APP_DEFAULT_FOOTER_ID
    const metadata: PageConfigMetadata = reactive(new PageConfigMetadata(
        createdTimestamp,
        updatedTimestamp,
    ))

    const obj: PageConfig = reactive(new PageConfig(
        uuid,
        lang,
        pageName,
        contentId,
        isIncludeBootstrap,
        headVersion,
        bootstrapVersion,
        templateVersion,
        headerId,
        areaConfigArr,
        footerId,
        metadata,
    ))
    return obj

}

export default getNewPageConfig