import { RenderData_Footer } from "@/classes/renderData/pages/RenderData_Footer";
import { RenderData_Header } from "@/classes/renderData/pages/RenderData_Header";
import { RenderData_Page } from "@/classes/renderData/pages/RenderData_Page";
export declare const createRenderDataPage: ({ config, content, headerHTMLObject, areaHTMLObjectArr, footerHTMLObject, assets, }: {
    config?: import("../../page_cls_module/build").PageConfig | undefined;
    content?: import("../../page_cls_module/build").PageContent | undefined;
    headerHTMLObject?: import("../../page_cls_module/build").HeaderHTMLObject | undefined;
    areaHTMLObjectArr?: import("../../page_cls_module/build").AreaHTMLObject[] | undefined;
    footerHTMLObject?: import("../../page_cls_module/build").FooterHTMLObject | undefined;
    assets?: import("../../page_cls_module/build").ScriptAsset[] | undefined;
}) => RenderData_Page;
export declare const createRenderDataHeader: ({ content, config, }: {
    content?: import("../../page_cls_module/build").HeaderContent | undefined;
    config?: import("../../page_cls_module/build").HeaderConfig | undefined;
}) => RenderData_Header;
export declare const createRenderDataFooter: ({ content, config, }: {
    content?: import("../../page_cls_module/build").FooterContent | undefined;
    config?: import("../../page_cls_module/build").FooterConfig | undefined;
}) => RenderData_Footer;
