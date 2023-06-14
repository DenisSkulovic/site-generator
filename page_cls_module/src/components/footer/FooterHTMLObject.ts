import { FooterHTMLMetadata } from "../.."
import {buildFooterHTMLMetadata} from "./FooterHTMLMetadata"

export const buildFooterHTMLObject = (obj: any): FooterHTMLObject => {
    if (obj.clazz !== "FooterHTMLObject") throw new Error("clazz cannot be anything other than 'FooterHTMLObject'")
    if (!obj.html) throw new Error("html cannot be undefined")
    if (!obj.metadata) throw new Error("metadata cannot be undefined")
    const metadata = buildFooterHTMLMetadata(obj.metadata)
    const headerHTMLObject: FooterHTMLObject = new FooterHTMLObject(
        obj.uuid,
        obj.html,
        metadata,
    )

    return headerHTMLObject
}

export class FooterHTMLObject {
    uuid: string
    html: string
    metadata: FooterHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        metadata: FooterHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}