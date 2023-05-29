import * as DTO from "@page_cls_module"
import ejs from "ejs"
import getDirName from "../../../utils/getDirName"
import guid from "../../../utils/guid"
import { RenderData_Header } from "../../../classes/renderData/pages/RenderData_Header"

const generateHeaderHTML = async (
    headerConfig: DTO.HeaderConfig,
    headerContent: DTO.HeaderContent,
): Promise<DTO.HeaderHTMLObject> => {
    const templateVersion: string = headerConfig.templateVersion
    const bootstrapVersion: string = headerConfig.bootstrapVersion
    const __dirname: string = getDirName()
    const templatePath = `${__dirname}/templates/html/${bootstrapVersion}/header/${templateVersion}/index.ejs`
    const uuid: string = guid()

    const renderData_header: RenderData_Header = new RenderData_Header(
        headerContent,
        headerConfig,
    )
    const html: string = await ejs.renderFile(templatePath, renderData_header)

    const createdTimestamp: number = Date.now()
    const updatedTimestamp = createdTimestamp
    const metadata: DTO.HeaderHTMLMetadata = new DTO.HeaderHTMLMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const res: DTO.HeaderHTMLObject = new DTO.HeaderHTMLObject(
        uuid,
        html,
        headerConfig,
        headerContent,
        metadata,
    )
    return res
}

export default generateHeaderHTML