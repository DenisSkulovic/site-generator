import { AreaConfig, BootstrapVersionEnum, PageConfigMetadata, SkeletonVersionEnum, HeadVersionEnum, LangEnum, Asset } from "../../../";
export declare const buildPageConfig: (obj: any) => PageConfig;
export declare class PageConfig {
    uuid: string;
    lang: LangEnum;
    pageName: string;
    pagePath: string;
    contentId: string;
    isIncludeBootstrap: boolean;
    headVersion: HeadVersionEnum;
    bootstrapVersion: BootstrapVersionEnum;
    templateVersion: SkeletonVersionEnum;
    areaConfigArr: AreaConfig[];
    assets: Asset[];
    metadata: PageConfigMetadata;
    clazz: string;
    constructor(uuid: string, lang: LangEnum, pageName: string, pagePath: string, contentId: string, isIncludeBootstrap: boolean, headVersion: HeadVersionEnum, bootstrapVersion: BootstrapVersionEnum, templateVersion: SkeletonVersionEnum, areaConfigArr: AreaConfig[], assets: Asset[], metadata: PageConfigMetadata);
}
//# sourceMappingURL=PageConfig.d.ts.map