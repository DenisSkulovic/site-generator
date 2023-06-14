import { PageHTMLMetadata, PageConfig, PageContent } from "../../../"
import {buildPageConfig} from "../Config/PageConfig"
import {buildPageHTMLMetadata} from "./PageHTMLMetadata"
import {buildPageContent} from "../Content/PageContent"

export const buildPageHTMLObject = (obj: any): PageHTMLObject => {
    if (obj.clazz !== "PageHTMLObject") throw new Error("clazz cannot be anything other than 'PageHTMLObject'")
    const pageHTMLMetadata: PageHTMLMetadata = buildPageHTMLMetadata(obj.metadata)

    const pageHTMLObject: PageHTMLObject = new PageHTMLObject(
        obj.uuid,
        obj.html,
        pageHTMLMetadata,
    )
    return pageHTMLObject
}

export class PageHTMLObject {
    uuid: string
    html: string
    metadata: PageHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        metadata: PageHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}