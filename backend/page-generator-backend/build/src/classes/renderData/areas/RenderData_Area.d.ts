import { AreaConfig, AreaContent, AreaHTMLObject, BlockHTMLObject } from "@page_cls_module";
export declare class RenderData_Area {
    config: AreaConfig;
    content: AreaContent;
    protected HTMLObjectArr: Array<(AreaHTMLObject | BlockHTMLObject)>;
    cols: number[];
    classString?: string;
    clazz: string;
    constructor(config: AreaConfig, content: AreaContent, HTMLObjectArr: Array<(AreaHTMLObject | BlockHTMLObject)>, cols: number[], classString?: string);
    getHTMLObjectArr(): Array<(AreaHTMLObject | BlockHTMLObject)>;
}
