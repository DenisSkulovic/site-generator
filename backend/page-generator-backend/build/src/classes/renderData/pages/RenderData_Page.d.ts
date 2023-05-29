import * as DTO from "@page_cls_module";
export declare class RenderData_Page {
    config: DTO.PageConfig;
    content: DTO.PageContent;
    headerHTMLObject: DTO.HeaderHTMLObject;
    areaHTMLObjectArr: Array<DTO.AreaHTMLObject>;
    footerHTMLObject: DTO.FooterHTMLObject;
    clazz: string;
    constructor(config: DTO.PageConfig, content: DTO.PageContent, headerHTMLObject: DTO.HeaderHTMLObject, areaHTMLObjectArr: Array<DTO.AreaHTMLObject>, footerHTMLObject: DTO.FooterHTMLObject);
}
