import { AreaHTMLObject, Asset, FooterHTMLObject, HeaderHTMLObject, PageConfig, PageContent } from "@page_cls_module"

export class RenderData_Page {
    config: PageConfig
    content: PageContent
    headerHTMLObject: HeaderHTMLObject
    areaHTMLObjectArr: Array<AreaHTMLObject>
    footerHTMLObject: FooterHTMLObject
    assets: Asset[]
    clazz: string
    constructor(
        config: PageConfig,
        content: PageContent,
        headerHTMLObject: HeaderHTMLObject,
        areaHTMLObjectArr: Array<AreaHTMLObject>,
        footerHTMLObject: FooterHTMLObject,
        assets: Asset[],
    ) {
        this.config = config
        this.content = content
        this.headerHTMLObject = headerHTMLObject
        this.areaHTMLObjectArr = areaHTMLObjectArr
        this.footerHTMLObject = footerHTMLObject
        this.assets = assets
        this.clazz = this.constructor.name
    }
}