import { FooterConfig, FooterContent, buildFooterConfig, buildFooterContent } from "../../"

export const buildGenerateFooterRequest = (obj: any): GenerateFooterRequest => {
    if (obj.clazz !== "GenerateFooterRequest") throw new Error("clazz cannot be anything other than 'GenerateFooterRequest'")
    const content: FooterContent = buildFooterContent(obj.content)
    const config: FooterConfig = buildFooterConfig(obj.config)
    const generateBlockRequest: GenerateFooterRequest = new GenerateFooterRequest(
        content,
        config,
    )

    return generateBlockRequest
}

export class GenerateFooterRequest {
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