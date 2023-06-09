import { RenderData_Footer } from "@/classes/renderData/pages/RenderData_Footer";
import { RenderData_Header } from "@/classes/renderData/pages/RenderData_Header";
import { RenderData_Page } from "@/classes/renderData/pages/RenderData_Page";
import { createPageConfig, createPageContent, createHeaderHTMLObject, createAreaHTMLObject, createFooterHTMLObject, createHeaderContent, createHeaderConfig, createFooterContent, createFooterConfig } from "../../../../page_cls_module/src/mockFactories";

export const createRenderDataPage = ({
    config = createPageConfig({}),
    content = createPageContent({}),
    headerHTMLObject = createHeaderHTMLObject({}),
    areaHTMLObjectArr = [createAreaHTMLObject({})],
    footerHTMLObject = createFooterHTMLObject({})
}): RenderData_Page => {
    return new RenderData_Page(
        config, content,
        headerHTMLObject,
        areaHTMLObjectArr,
        footerHTMLObject,
    );
};

export const createRenderDataHeader = ({
    content = createHeaderContent({}),
    config = createHeaderConfig({}),
}): RenderData_Header => {
    return new RenderData_Header(
        content,
        config,
    );
};

export const createRenderDataFooter = ({
    content = createFooterContent({}),
    config = createFooterConfig({}),
}): RenderData_Footer => {
    return new RenderData_Footer(
        content,
        config,
    );
};