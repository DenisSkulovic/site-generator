import { PageConfig, LangEnum, HeadVersionEnum, SkeletonVersionEnum, BootstrapVersionEnum, type AreaConfig, type Asset, PageConfigMetadata } from "../../../../../page_cls_module/src"
import getUUID from "../getUUID"

const getNewPageConfig = (path: string, contentId: string): PageConfig => {
    const now = Date.now()
    const uuid: string = getUUID()
    const lang = LangEnum.LT
    const pageName = path
    const pagePath = path
    const isIncludeBootstrap = false
    const headVersion = HeadVersionEnum.TEST_VERSION
    const templateVersion = SkeletonVersionEnum.TEST_VERSION
    const bootstrapVersion: BootstrapVersionEnum = BootstrapVersionEnum.BOOTSTRAP_5_0_2
    const areaConfigArr: AreaConfig[] = []
    const assets: Asset[] = []

    const createdTimestamp = now
    const updatedTimestamp = now
    const metadata = new PageConfigMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const obj: PageConfig = new PageConfig(
        uuid, lang, pageName, pagePath, contentId, isIncludeBootstrap, headVersion, bootstrapVersion, templateVersion, areaConfigArr, assets, metadata
    )
    return obj
}

export default getNewPageConfig