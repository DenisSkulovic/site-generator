import { FooterConfig, FooterContent, FooterHTMLMetadata } from "../.."
import {buildFooterHTMLMetadata} from "./FooterHTMLMetadata"
import {buildFooterContent} from "./FooterContent"
import {buildFooterConfig} from "./FooterConfig"

export const buildFooterHTMLObject = (obj: any): FooterHTMLObject => {
    if (obj.clazz !== "FooterHTMLObject") throw new Error("clazz cannot be anything other than 'FooterHTMLObject'")
    if (!obj.html) throw new Error("html cannot be undefined")
    if (!obj.metadata) throw new Error("metadata cannot be undefined")
    const content: FooterContent = buildFooterContent(obj.content)
    const config: FooterConfig = buildFooterConfig(obj.config)
    const metadata = buildFooterHTMLMetadata(obj.metadata)
    const headerHTMLObject: FooterHTMLObject = new FooterHTMLObject(
        obj.uuid,
        obj.html,
        content,
        config,
        metadata,
    )

    return headerHTMLObject
}

export class FooterHTMLObject {
    uuid: string
    html: string
    content: FooterContent
    config: FooterConfig
    metadata: FooterHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        content: FooterContent,
        config: FooterConfig,
        metadata: FooterHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.content = content
        this.config = config
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}