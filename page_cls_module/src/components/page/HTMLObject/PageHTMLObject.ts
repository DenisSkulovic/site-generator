import { PageHTMLMetadata, PageConfig, PageContent } from "../../../"
import {buildPageConfig} from "../Config/PageConfig"
import {buildPageHTMLMetadata} from "./PageHTMLMetadata"
import {buildPageContent} from "../Content/PageContent"

export const buildPageHTMLObject = (obj: any): PageHTMLObject => {
    if (obj.clazz !== "PageHTMLObject") throw new Error("clazz cannot be anything other than 'PageHTMLObject'")
    const config: PageConfig = buildPageConfig(obj.config)
    const pageHTMLMetadata: PageHTMLMetadata = buildPageHTMLMetadata(obj.metadata)
    const content: PageContent = buildPageContent(obj.content)

    const pageHTMLObject: PageHTMLObject = new PageHTMLObject(
        obj.uuid,
        obj.html,
        config,
        content,
        pageHTMLMetadata,
    )
    return pageHTMLObject
}

export class PageHTMLObject {
    uuid: string
    html: string
    config: PageConfig
    content: PageContent
    metadata: PageHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        config: PageConfig,
        content: PageContent,
        metadata: PageHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.config = config
        this.content = content
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}