import { BlockConfig, BlockContent, BlockHTMLMetadata, BlockHTMLObject, BlockTemplateEnum, BootstrapVersionEnum } from "@page_cls_module";
import { RenderData_Block } from "../../../classes/renderData/blocks/RenderData_Block";
export declare const getTemplatePath: (__dirname: string, bootstrapVersion: BootstrapVersionEnum, blockTemplateName: BlockTemplateEnum) => string;
export declare const buildBlockHTMLObject: (uuid: string, blockHtml: string, blockConfig: BlockConfig, blockContent: BlockContent, blockMetadata: BlockHTMLMetadata) => BlockHTMLObject;
export declare const buildRenderDataBlock: (blockContent: BlockContent, blockConfig: BlockConfig) => RenderData_Block;
export declare const renderEjsFile: (path: string, renderData: RenderData_Block) => Promise<string>;
declare const constructBlock: (blockContent: BlockContent, blockConfig: BlockConfig) => Promise<BlockHTMLObject>;
export default constructBlock;
