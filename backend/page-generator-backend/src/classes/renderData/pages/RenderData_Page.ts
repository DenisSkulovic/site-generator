import { AreaHTMLObject, Asset, PageConfig, PageContent } from "@page_cls_module"

export class RenderData_Page {
    config: PageConfig
    content: PageContent
    headerHTML: string
    areaHTMLObjectArr: Array<AreaHTMLObject>
    footerHTML: string
    assets: Asset[]
    clazz: string
    constructor(
        config: PageConfig,
        content: PageContent,
        headerHTML: string,
        areaHTMLObjectArr: Array<AreaHTMLObject>,
        footerHTML: string,
        assets: Asset[],
    ) {
        this.config = config
        this.content = content
        this.headerHTML = headerHTML
        this.areaHTMLObjectArr = areaHTMLObjectArr
        this.footerHTML = footerHTML
        this.assets = assets
        this.clazz = this.constructor.name
    }
}