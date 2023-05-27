import * as DTO from "../../../../../../page_cls_module"
import ejs from "ejs"
import getDirName from "../../../utils/getDirName"
import guid from "../../../utils/guid"
import {RenderData_Footer} from "../../../classes/renderData/pages/RenderData_Footer"

const generateFooterHTML = async (
    footerConfig: DTO.FooterConfig,
    footerContent: DTO.FooterContent,
): Promise<DTO.FooterHTMLObject> => {
    const templateVersion: string = footerConfig.templateVersion
    const bootstrapVersion: string = footerConfig.bootstrapVersion
    const __dirname: string = getDirName()
    const templatePath = `${__dirname}/templates/html/${bootstrapVersion}/footer/${templateVersion}/index.ejs`
    const uuid: string = guid()

    const footerRenderData: RenderData_Footer = new RenderData_Footer(
        footerContent,
        footerConfig,
    )
    const html: string = await ejs.renderFile(templatePath, footerRenderData)

    const createdTimestamp: number = Date.now()
    const updatedTimestamp = createdTimestamp
    const metadata: DTO.FooterHTMLMetadata = new DTO.FooterHTMLMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const res: DTO.FooterHTMLObject = new DTO.FooterHTMLObject(
        uuid,
        html,
        footerContent,
        footerConfig,
        metadata,
    )
    return res
}

export default generateFooterHTML