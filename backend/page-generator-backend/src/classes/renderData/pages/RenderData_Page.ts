import * as DTO from "@page_cls_module"

export class RenderData_Page {
    config: DTO.PageConfig
    content: DTO.PageContent
    headerHTMLObject: DTO.HeaderHTMLObject
    areaHTMLObjectArr: Array<DTO.AreaHTMLObject>
    footerHTMLObject: DTO.FooterHTMLObject
    clazz: string
    constructor(
        config: DTO.PageConfig,
        content: DTO.PageContent,
        headerHTMLObject: DTO.HeaderHTMLObject,
        areaHTMLObjectArr: Array<DTO.AreaHTMLObject>,
        footerHTMLObject: DTO.FooterHTMLObject,
    ) {
        this.config = config
        this.content = content
        this.headerHTMLObject = headerHTMLObject
        this.areaHTMLObjectArr = areaHTMLObjectArr
        this.footerHTMLObject = footerHTMLObject
        this.clazz = this.constructor.name
    }
}