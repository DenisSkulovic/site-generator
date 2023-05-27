import { HeaderConfig, HeaderContent, buildHeaderConfig, buildHeaderContent } from "../../"

export const buildGenerateHeaderRequest = (obj: any): GenerateHeaderRequest => {
    if (obj.clazz !== "GenerateHeaderRequest") throw new Error("clazz cannot be anything other than 'GenerateHeaderRequest'")
    const content: HeaderContent = buildHeaderContent(obj.content)
    const config: HeaderConfig = buildHeaderConfig(obj.config)
    const generateBlockRequest: GenerateHeaderRequest = new GenerateHeaderRequest(
        content,
        config,
    )

    return generateBlockRequest
}

export class GenerateHeaderRequest {
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