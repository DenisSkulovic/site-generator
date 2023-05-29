import * as DTO from "@page_cls_module"
import ejs from "ejs"
import getDirName from "../../../utils/getDirName"
import guid from "../../../utils/guid"
import { RenderData_Page } from "../../../classes/renderData/pages/RenderData_Page"
import constructArea from "./constructArea"

const constructPage = async (
    pageContent: DTO.PageContent,
    pageConfig: DTO.PageConfig,
    headerHTMLObject: DTO.HeaderHTMLObject,
    footerHTMLObject: DTO.FooterHTMLObject,
): Promise<DTO.PageHTMLObject> => {
    const templateVersion = pageConfig.templateVersion
    const uuid: string = guid()

    const __dirname: string = getDirName()
    const skeletonTemplatePath = `${__dirname}/templates/html/${pageConfig.bootstrapVersion}/skeleton/${templateVersion}/index.ejs`

    const areaConfigArr: DTO.AreaConfig[] = pageConfig.areaConfigArr
    const areasContentObject: { [areaConfigId: string]: DTO.AreaContent; } = pageContent.data

    const areaHTMLObjectsPromiseArr: Promise<DTO.AreaHTMLObject>[] = areaConfigArr.map(async (areaConfig: DTO.AreaConfig) => {
        const areaContent: DTO.AreaContent | undefined = areasContentObject[areaConfig.uuid]
        if (!areaContent) throw new Error("areaContent cannot be undefined")
        const areaHTMLObject: DTO.AreaHTMLObject = await constructArea(
            areaConfig,
            areaContent,
        )
        return areaHTMLObject
    })
    const areaHTMLObjectsArr: DTO.AreaHTMLObject[] = await Promise.all(areaHTMLObjectsPromiseArr)

    const pageRenderData: RenderData_Page = new RenderData_Page(
        pageConfig,
        pageContent,
        headerHTMLObject,
        areaHTMLObjectsArr,
        footerHTMLObject,
    )
    const pageHtml: string = await ejs.renderFile(skeletonTemplatePath, pageRenderData)

    const createdTimestamp: number = Date.now()
    const updatedTimestamp = createdTimestamp

    const pageMetadata: DTO.PageHTMLMetadata = new DTO.PageHTMLMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const pageHTMLObject: DTO.PageHTMLObject = new DTO.PageHTMLObject(
        uuid,
        pageHtml,
        pageConfig,
        pageContent,
        pageMetadata,
    )
    return pageHTMLObject
}

export default constructPage