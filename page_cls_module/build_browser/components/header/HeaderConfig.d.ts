import { HeaderConfigMetadata, HeaderTemplateVersionEnum, BootstrapVersionEnum } from "../../";
export declare const buildHeaderConfig: (obj: any) => HeaderConfig;
export declare class HeaderConfig {
    uuid: string;
    templateVersion: HeaderTemplateVersionEnum;
    bootstrapVersion: BootstrapVersionEnum;
    isIncludeNavbar: boolean;
    metadata: HeaderConfigMetadata;
    clazz: string;
    constructor(uuid: string, templateVersion: HeaderTemplateVersionEnum, bootstrapVersion: BootstrapVersionEnum, isIncludeNavbar: boolean, metadata: HeaderConfigMetadata);
}
//# sourceMappingURL=HeaderConfig.d.ts.map