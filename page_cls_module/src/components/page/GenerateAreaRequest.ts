import { AreaContent, AreaConfig, buildAreaContent, buildAreaConfig } from "../../"

export const buildGenerateAreaRequest = (obj: any): GenerateAreaRequest => {
    if (obj.clazz !== "GenerateAreaRequest") throw new Error("clazz cannot be anything other than 'GenerateAreaRequest'")
    const content: AreaContent = buildAreaContent(obj.content)
    const config: AreaConfig = buildAreaConfig(obj.config)
    const generateAreaRequest: GenerateAreaRequest = new GenerateAreaRequest(
        content,
        config,
    )

    return generateAreaRequest
}

export class GenerateAreaRequest {
    content: AreaContent
    config: AreaConfig
    clazz: string
    constructor(
        content: AreaContent,
        config: AreaConfig,
    ) {
        this.content = content
        this.config = config
        this.clazz = this.constructor.name
    }
}