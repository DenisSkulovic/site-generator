import { AreaConfig, AreaContent, AreaHTMLObject, AreaLayoutEnum, BlockConfig, BlockHTMLObject } from "@page_cls_module";
export declare const constructChildHTMLObject: (childConfig: AreaConfig | BlockConfig, areaContent: AreaContent, constructArea: ConstructAreaFn) => Promise<AreaHTMLObject | BlockHTMLObject>;
export declare const getClassString: (areaConfig: AreaConfig) => string;
export declare const getCols: (areaTemplateName: AreaLayoutEnum) => number[];
type ConstructAreaFn = (areaConfig: AreaConfig, areaContent: AreaContent) => Promise<AreaHTMLObject>;
export declare const constructArea: ConstructAreaFn;
export default constructArea;
