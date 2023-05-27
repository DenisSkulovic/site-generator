import { HeaderConfig, HeaderContent, HeaderHTMLMetadata } from "../../../"
import {buildHeaderConfig} from "../../header/HeaderConfig"
import {buildHeaderHTMLMetadata} from "./HeaderHTMLMetadata"
import {buildHeaderContent} from "../../header/HeaderContent"

export const buildHeaderHTMLObject = (obj: any): HeaderHTMLObject => {
    if (obj.clazz !== "HeaderHTMLObject") throw new Error("clazz cannot be anything other than 'HeaderHTMLObject'")
    if (!obj.html) throw new Error("html cannot be undefined")
    if (!obj.metadata) throw new Error("metadata cannot be undefined")
    const config: HeaderConfig = buildHeaderConfig(obj.config)
    const content: HeaderContent = buildHeaderContent(obj.content)
    const metadata = buildHeaderHTMLMetadata(obj.metadata)
    const headerHTMLObject: HeaderHTMLObject = new HeaderHTMLObject(
        obj.uuid,
        obj.html,
        config,
        content,
        metadata,
    )

    return headerHTMLObject
}

export class HeaderHTMLObject {
    uuid: string
    html: string
    config: HeaderConfig
    content: HeaderContent
    metadata: HeaderHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        config: HeaderConfig,
        content: HeaderContent,
        metadata: HeaderHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.config = config
        this.content = content
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}