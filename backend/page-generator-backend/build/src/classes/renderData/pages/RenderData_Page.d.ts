import { AreaHTMLObject, Asset, FooterHTMLObject, HeaderHTMLObject, PageConfig, PageContent } from "@page_cls_module";
export declare class RenderData_Page {
    config: PageConfig;
    content: PageContent;
    headerHTMLObject: HeaderHTMLObject;
    areaHTMLObjectArr: Array<AreaHTMLObject>;
    footerHTMLObject: FooterHTMLObject;
    assets: Asset[];
    clazz: string;
    constructor(config: PageConfig, content: PageContent, headerHTMLObject: HeaderHTMLObject, areaHTMLObjectArr: Array<AreaHTMLObject>, footerHTMLObject: FooterHTMLObject, assets: Asset[]);
}
