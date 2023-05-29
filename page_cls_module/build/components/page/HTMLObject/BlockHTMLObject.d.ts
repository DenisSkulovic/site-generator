import { BlockConfig, BlockContent, BlockHTMLMetadata } from "../../../";
export declare const buildBlockHTMLObject: (obj: any) => BlockHTMLObject;
export declare class BlockHTMLObject {
    uuid: string;
    html: string;
    config: BlockConfig;
    content: BlockContent;
    metadata: BlockHTMLMetadata;
    clazz: string;
    constructor(uuid: string, html: string, config: BlockConfig, content: BlockContent, metadata: BlockHTMLMetadata);
}
//# sourceMappingURL=BlockHTMLObject.d.ts.map