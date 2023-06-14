import { AreaConfig, AreaContent, AreaHTMLObject, Asset, BootstrapVersionEnum, FooterHTMLObject, HeaderHTMLObject, PageConfig, PageContent, PageHTMLMetadata, PageHTMLObject, SkeletonVersionEnum } from "@page_cls_module"
import { RenderData_Page } from "../../../classes/renderData/pages/RenderData_Page"
import ejs from "ejs"

export const buildPageHTMLObject = (
    uuid: string,
    pageHtml: string,
    pageMetadata: PageHTMLMetadata,
) => {
    return new PageHTMLObject(
        uuid,
        pageHtml,
        pageMetadata,
    );
}

export const buildPageHTMLMetadata = (
    pageConfigUUID: string,
    pageContentUUID: string,
    createdTimestamp: number,
    updatedTimestamp: number,
) => {
    return new PageHTMLMetadata(
        pageConfigUUID,
        pageContentUUID,
        createdTimestamp,
        updatedTimestamp,
    );
}

export const renderEjsFile = async (
    skeletonTemplatePath: string,
    pageRenderData: RenderData_Page,
) => {
    return await ejs.renderFile(skeletonTemplatePath, pageRenderData);
}

export const buildPageRenderData = (
    pageConfig: PageConfig,
    pageContent: PageContent,
    headerHTMLObject: HeaderHTMLObject,
    areaHTMLObjectsArr: AreaHTMLObject[],
    footerHTMLObject: FooterHTMLObject,
    assets: Asset[],
) => {
    return new RenderData_Page(
        pageConfig,
        pageContent,
        headerHTMLObject,
        areaHTMLObjectsArr,
        footerHTMLObject,
        assets,
    );
}

export const getSkeletonTemplatePath = (
    __dirname: string,
    bootstrapVersion: BootstrapVersionEnum,
    templateVersion: SkeletonVersionEnum,
) => {
    return `${__dirname}/templates/html/${bootstrapVersion}/skeleton/${templateVersion}/index.ejs`;
}

export const constructPage = async (
    pageContent: PageContent,
    pageConfig: PageConfig,
    headerHTMLObject: HeaderHTMLObject,
    footerHTMLObject: FooterHTMLObject,
    __dirname: string,
    constructArea: (areaConfig: AreaConfig, areaContent: AreaContent) => Promise<AreaHTMLObject>,
    guidFn: () => string,
) => {
    const templateVersion = pageConfig.templateVersion
    const uuid: string = guidFn()

    const skeletonTemplatePath = getSkeletonTemplatePath(__dirname, pageConfig.bootstrapVersion, templateVersion)

    const areaConfigArr: AreaConfig[] = pageConfig.areaConfigArr
    const areasContentObject: { [areaConfigId: string]: AreaContent; } = pageContent.data

    const areaHTMLObjectsPromiseArr: Promise<AreaHTMLObject>[] = areaConfigArr.map(async (areaConfig: AreaConfig) => {
        const areaContent: AreaContent | undefined = areasContentObject[areaConfig.uuid]
        if (!areaContent) throw new Error("areaContent cannot be undefined")
        const areaHTMLObject: AreaHTMLObject = await constructArea(
            areaConfig,
            areaContent,
        )
        return areaHTMLObject
    })
    const areaHTMLObjectsArr: AreaHTMLObject[] = await Promise.all(areaHTMLObjectsPromiseArr)

    const pageRenderData = buildPageRenderData(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject, pageConfig.assets)
    const pageHtml = await renderEjsFile(skeletonTemplatePath, pageRenderData)

    const createdTimestamp: number = Date.now()
    const updatedTimestamp = createdTimestamp

    const pageMetadata = buildPageHTMLMetadata(pageConfig.uuid, pageContent.uuid, createdTimestamp, updatedTimestamp)
    const pageHTMLObject = buildPageHTMLObject(uuid, pageHtml, pageMetadata)
    
    return pageHTMLObject
}
