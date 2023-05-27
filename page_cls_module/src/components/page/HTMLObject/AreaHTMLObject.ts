import { AreaConfig, AreaContent, AreaHTMLMetadata } from "../../../"
import {buildAreaConfig} from "../Config/AreaConfig"
import {buildAreaHTMLMetadata} from "./AreaHTMLMetadata"
import {buildAreaContent} from "../Content/AreaContent"

export const buildAreaHTMLObject = (obj: any): AreaHTMLObject => {
    if (obj.clazz !== "AreaHTMLObject") throw new Error("clazz cannot be anything other than 'AreaHTMLObject'")
    const config: AreaConfig = buildAreaConfig(obj.config)
    const areaMetadata: AreaHTMLMetadata = buildAreaHTMLMetadata(obj.areaMetadata)
    const content: AreaContent = buildAreaContent(obj.content)

    const areaHTMLObject: AreaHTMLObject = new AreaHTMLObject(
        obj.uuid,
        obj.html,
        config,
        content,
        areaMetadata,
    )
    return areaHTMLObject
}

export class AreaHTMLObject {
    uuid: string
    html: string
    config: AreaConfig
    content: AreaContent
    metadata: AreaHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        config: AreaConfig,
        content: AreaContent,
        metadata: AreaHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.config = config
        this.content = content
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}