import * as DTO from "@page_cls_module"
import guid from "../../../utils/guid"
import getDirName from "../../../utils/getDirName"
import ejs from "ejs"
import { RenderData_Block } from "../../../classes/renderData/blocks/RenderData_Block"


const constructBlock = async (
    blockContent: DTO.BlockContent,
    blockConfig: DTO.BlockConfig,
): Promise<DTO.BlockHTMLObject> => {

    const __dirname: string = getDirName()
    const bootstrapVersion: DTO.BootstrapVersionEnum = blockConfig.bootstrapVersion
    const blockTemplateName: DTO.BlockTemplateEnum = blockConfig.blockTemplateName
    const uuid: string = guid()
    const createdTimestamp: number = Date.now()
    const updatedTimestamp = createdTimestamp

    const blockTemplatePath = `${__dirname}/templates/html/${bootstrapVersion}/blocks/${blockTemplateName}/index.ejs`

    const blockRenderData: RenderData_Block = new RenderData_Block(
        blockContent,
        blockConfig,
    )

    const blockHtml: string = await ejs.renderFile(blockTemplatePath, blockRenderData)
    const blockMetadata: DTO.BlockHTMLMetadata = new DTO.BlockHTMLMetadata(
        createdTimestamp,
        updatedTimestamp,
    )

    const res: DTO.BlockHTMLObject = new DTO.BlockHTMLObject(
        uuid,
        blockHtml,
        blockConfig,
        blockContent,
        blockMetadata,
    )

    return res
}

export default constructBlock