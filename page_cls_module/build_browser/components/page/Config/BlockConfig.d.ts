import { BlockTemplateEnum, BootstrapVersionEnum, BlockConfigMetadata } from "../../../";
export declare const buildBlockConfig: (obj: any) => BlockConfig;
export declare class BlockConfig {
    uuid: string;
    blockName: string;
    bootstrapVersion: BootstrapVersionEnum;
    blockTemplateName: BlockTemplateEnum;
    metadata: BlockConfigMetadata;
    clazz: string;
    constructor(uuid: string, blockName: string, bootstrapVersion: BootstrapVersionEnum, blockTemplateName: BlockTemplateEnum, metadata: BlockConfigMetadata);
}
//# sourceMappingURL=BlockConfig.d.ts.map