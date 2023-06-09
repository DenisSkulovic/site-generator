import { AreaConfig, BootstrapVersionEnum, PageConfigMetadata, SkeletonVersionEnum, HeadVersionEnum, LangEnum } from "../../../"

import { buildAreaConfig } from "./AreaConfig"
import { buildPageConfigMetadata } from "./PageConfigMetadata"

export const buildPageConfig = (obj: any): PageConfig => {
    if (!obj.uuid) throw new Error("uuid cannot be undefined")
    if (!obj.pageName) throw new Error("pageName cannot be undefined")
    if (obj.clazz !== "PageConfig") throw new Error("clazz cannot be anything other than 'PageConfig'")
    if (!Array.isArray(obj.areaConfigArr)) throw new Error("obj.areaConfigArr must be an array of strings")
    if (!Object.values(BootstrapVersionEnum).includes(obj.bootstrapVersion)) throw new Error("unrecognized bootstrapVersion")
    if (!Object.values(SkeletonVersionEnum).includes(obj.templateVersion)) throw new Error("unrecognized skeleton templateVersion")
    if (!Object.values(HeadVersionEnum).includes(obj.headVersion)) throw new Error("unrecognized headVersion")
    if (!Object.values(LangEnum).includes(obj.lang)) throw new Error("unrecognized lang")
    const lang: LangEnum = obj.lang
    const bootstrapVersion: BootstrapVersionEnum = obj.bootstrapVersion
    const templateVersion: SkeletonVersionEnum = obj.templateVersion
    const metadata: PageConfigMetadata = buildPageConfigMetadata(obj.metadata)
    const areaConfigArr: AreaConfig[] = obj.areaConfigArr.map((obj: any) => {
        return buildAreaConfig(obj)
    })
    const pageConfig: PageConfig = new PageConfig(
        obj.uuid,
        lang,
        obj.pageName,
        obj.contentId,
        Boolean(obj.isIncludeBootstrap),
        obj.headVersion,
        bootstrapVersion,
        templateVersion,
        areaConfigArr,
        metadata,
    )
    return pageConfig
}

export class PageConfig { // this should be stored as a separate object, on DynamoDB
    uuid: string
    lang: LangEnum
    pageName: string
    contentId: string
    isIncludeBootstrap: boolean
    headVersion: HeadVersionEnum
    bootstrapVersion: BootstrapVersionEnum
    templateVersion: SkeletonVersionEnum
    areaConfigArr: AreaConfig[]
    metadata: PageConfigMetadata
    clazz: string
    constructor(
        uuid: string,
        lang: LangEnum,
        pageName: string,
        contentId: string,
        isIncludeBootstrap: boolean,
        headVersion: HeadVersionEnum,
        bootstrapVersion: BootstrapVersionEnum,
        templateVersion: SkeletonVersionEnum,
        areaConfigArr: AreaConfig[],
        metadata: PageConfigMetadata,
    ) {
        this.uuid = uuid
        this.lang = lang
        this.pageName = pageName
        this.contentId = contentId
        this.isIncludeBootstrap = isIncludeBootstrap
        this.headVersion = headVersion
        this.bootstrapVersion = bootstrapVersion
        this.templateVersion = templateVersion
        this.areaConfigArr = areaConfigArr
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}