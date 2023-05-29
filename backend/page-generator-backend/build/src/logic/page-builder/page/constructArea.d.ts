import * as DTO from "@page_cls_module";
/**
 * This function should not generate anything, and instead, it should only combine received html and create a page. Other functions are responsible for generation of HTML
 */
declare const constructArea: (areaConfig: DTO.AreaConfig, areaContent: DTO.AreaContent) => Promise<DTO.AreaHTMLObject>;
export default constructArea;
