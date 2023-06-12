import { AreaConfig, AreaContent, AreaHTMLObject, Asset, BootstrapVersionEnum, FooterHTMLObject, HeaderHTMLObject, PageConfig, PageContent, PageHTMLMetadata, PageHTMLObject, SkeletonVersionEnum } from "@page_cls_module";
import { RenderData_Page } from "../../../classes/renderData/pages/RenderData_Page";
export declare const buildPageHTMLObject: (uuid: string, pageHtml: string, pageConfig: PageConfig, pageContent: PageContent, pageMetadata: PageHTMLMetadata) => PageHTMLObject;
export declare const buildPageHTMLMetadata: (createdTimestamp: number, updatedTimestamp: number) => PageHTMLMetadata;
export declare const renderEjsFile: (skeletonTemplatePath: string, pageRenderData: RenderData_Page) => Promise<string>;
export declare const buildPageRenderData: (pageConfig: PageConfig, pageContent: PageContent, headerHTMLObject: HeaderHTMLObject, areaHTMLObjectsArr: AreaHTMLObject[], footerHTMLObject: FooterHTMLObject, assets: Asset[]) => RenderData_Page;
export declare const getSkeletonTemplatePath: (__dirname: string, bootstrapVersion: BootstrapVersionEnum, templateVersion: SkeletonVersionEnum) => string;
export declare const constructPage: (pageContent: PageContent, pageConfig: PageConfig, headerHTMLObject: HeaderHTMLObject, footerHTMLObject: FooterHTMLObject, __dirname: string, constructArea: (areaConfig: AreaConfig, areaContent: AreaContent) => Promise<AreaHTMLObject>, guidFn: () => string) => Promise<PageHTMLObject>;
