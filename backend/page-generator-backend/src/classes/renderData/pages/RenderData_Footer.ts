import { FooterConfig, FooterContent } from "../../../../../../page_cls_module/src";

export class RenderData_Footer {
    content: FooterContent
    config: FooterConfig
    clazz: string
    constructor(
        content: FooterContent,
        config: FooterConfig,
    ) {
        this.content = content
        this.config = config
        this.clazz = this.constructor.name
    }
}