import * as DTO from "@page_cls_module";
declare const constructPage: (pageContent: DTO.PageContent, pageConfig: DTO.PageConfig, headerHTMLObject: DTO.HeaderHTMLObject, footerHTMLObject: DTO.FooterHTMLObject) => Promise<DTO.PageHTMLObject>;
export default constructPage;
