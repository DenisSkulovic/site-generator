import { AreaConfig, BootstrapVersionEnum, PageConfigMetadata, SkeletonVersionEnum, HeadVersionEnum, LangEnum } from "../../../";
export declare const buildPageConfig: (obj: any) => PageConfig;
export declare class PageConfig {
    uuid: string;
    lang: LangEnum;
    pageName: string;
    contentId: string;
    isIncludeBootstrap: boolean;
    headVersion: HeadVersionEnum;
    bootstrapVersion: BootstrapVersionEnum;
    templateVersion: SkeletonVersionEnum;
    headerId: string;
    areaConfigArr: AreaConfig[];
    footerId: string;
    metadata: PageConfigMetadata;
    clazz: string;
    constructor(uuid: string, lang: LangEnum, pageName: string, contentId: string, isIncludeBootstrap: boolean, headVersion: HeadVersionEnum, bootstrapVersion: BootstrapVersionEnum, templateVersion: SkeletonVersionEnum, headerId: string, areaConfigArr: AreaConfig[], footerId: string, metadata: PageConfigMetadata);
}
//# sourceMappingURL=PageConfig.d.ts.map