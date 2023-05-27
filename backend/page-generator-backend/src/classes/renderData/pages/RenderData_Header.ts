import { HeaderConfig, HeaderContent } from "../../../../../../page_cls_module"

export class RenderData_Header {
    content: HeaderContent
    config: HeaderConfig
    clazz: string
    constructor(
        content: HeaderContent,
        config: HeaderConfig,
    ) {
        this.content = content
        this.config = config
        this.clazz = this.constructor.name
    }
}