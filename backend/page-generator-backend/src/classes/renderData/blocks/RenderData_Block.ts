import { BlockConfig, BlockContent } from "../../../../../../page_cls_module"

export class RenderData_Block {
    content: BlockContent
    config: BlockConfig
    clazz: string
    constructor(
        content: BlockContent,
        config: BlockConfig,
    ) {
        this.content = content
        this.config = config
        this.clazz = this.constructor.name
    }
}