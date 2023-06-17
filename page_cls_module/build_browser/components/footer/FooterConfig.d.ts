import { FooterConfigMetadata, FooterTemplateVersionEnum, BootstrapVersionEnum } from "../../";
export declare const buildFooterConfig: (obj: any) => FooterConfig;
export declare class FooterConfig {
    uuid: string;
    templateVersion: FooterTemplateVersionEnum;
    bootstrapVersion: BootstrapVersionEnum;
    metadata: FooterConfigMetadata;
    clazz: string;
    constructor(uuid: string, templateVersion: FooterTemplateVersionEnum, bootstrapVersion: BootstrapVersionEnum, metadata: FooterConfigMetadata);
}
//# sourceMappingURL=FooterConfig.d.ts.map