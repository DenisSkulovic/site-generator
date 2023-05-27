import {PageContent, PageConfig, buildPageContent, buildPageConfig} from "../../"

export const buildGeneratePageRequest = (obj: any): GeneratePageRequest => {
    if (obj.clazz !== "GeneratePageRequest") throw new Error("clazz cannot be anything other than 'GeneratePageRequest'")
    const content: PageContent = buildPageContent(obj.content)
    const config: PageConfig = buildPageConfig(obj.config)

    const generatePageRequest: GeneratePageRequest = new GeneratePageRequest(
        content,
        config,
    )

    return generatePageRequest
}

export class GeneratePageRequest {
    content: PageContent
    config: PageConfig
    clazz: string
    constructor(
        content: PageContent,
        config: PageConfig,
    ) {
        this.content = content
        this.config = config
        this.clazz = this.constructor.name
    }
}