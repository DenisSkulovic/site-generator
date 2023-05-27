import { BlockContent, buildBlockConfig, buildBlockContent, BlockConfig } from "../../"

export const buildGenerateBlockRequest = (obj: any): GenerateBlockRequest => {
    if (obj.clazz !== "GenerateBlockRequest") throw new Error("clazz cannot be anything other than 'GenerateBlockRequest'")
    const content: BlockContent = buildBlockContent(obj.content)
    const config: BlockConfig = buildBlockConfig(obj.config)
    const generateBlockRequest: GenerateBlockRequest = new GenerateBlockRequest(
        content,
        config,
    )

    return generateBlockRequest
}

export class GenerateBlockRequest {
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