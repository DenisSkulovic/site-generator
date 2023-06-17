import { BlockConfig, BlockContent, BlockHTMLMetadata, BlockHTMLObject, BlockTemplateEnum, BootstrapVersionEnum } from "@page_cls_module"
import guid from "../../../utils/guid"
import getDirName from "../../../utils/getDirName"
import ejs from "ejs"
import { RenderData_Block } from "../../../classes/renderData/blocks/RenderData_Block"

export const getTemplatePath = (__dirname: string, bootstrapVersion: BootstrapVersionEnum, blockTemplateName: BlockTemplateEnum) => {
    return `${__dirname}/../../../templates/html/${bootstrapVersion}/blocks/${blockTemplateName}/index.ejs`;
}

export const buildBlockHTMLObject = (uuid: string, blockHtml: string, blockMetadata: BlockHTMLMetadata) => {
    return new BlockHTMLObject(uuid, blockHtml, blockMetadata);
}

export const buildRenderDataBlock = (blockContent: BlockContent, blockConfig: BlockConfig) => {
    return new RenderData_Block(blockContent, blockConfig);
}

export const renderEjsFile = async (path: string, renderData: RenderData_Block) => {
    return await ejs.renderFile(path, renderData);
}

const constructBlock = async (
    blockContent: BlockContent,
    blockConfig: BlockConfig,
): Promise<BlockHTMLObject> => {

    const __dirname: string = getDirName()
    const bootstrapVersion: BootstrapVersionEnum = blockConfig.bootstrapVersion
    const blockTemplateName: BlockTemplateEnum = blockConfig.blockTemplateName
    const uuid: string = guid()
    const createdTimestamp: number = Date.now()
    const updatedTimestamp = createdTimestamp

    const blockTemplatePath = getTemplatePath(__dirname, bootstrapVersion, blockTemplateName);
    const blockRenderData = buildRenderDataBlock(blockContent, blockConfig);
    const blockHtml = await renderEjsFile(blockTemplatePath, blockRenderData);
    const blockMetadata = new BlockHTMLMetadata(blockConfig.uuid, blockContent.uuid, createdTimestamp, updatedTimestamp);

    const res = buildBlockHTMLObject(uuid, blockHtml, blockMetadata);

    return res
}

export default constructBlock
