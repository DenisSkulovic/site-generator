import { HeaderHTMLMetadata } from "../../"
import {buildHeaderHTMLMetadata} from "./HeaderHTMLMetadata"

export const buildHeaderHTMLObject = (obj: any): HeaderHTMLObject => {
    if (obj.clazz !== "HeaderHTMLObject") throw new Error("clazz cannot be anything other than 'HeaderHTMLObject'")
    if (!obj.html) throw new Error("html cannot be undefined")
    if (!obj.metadata) throw new Error("metadata cannot be undefined")
    const metadata = buildHeaderHTMLMetadata(obj.metadata)
    const headerHTMLObject: HeaderHTMLObject = new HeaderHTMLObject(
        obj.uuid,
        obj.html,
        metadata,
    )

    return headerHTMLObject
}

export class HeaderHTMLObject {
    uuid: string
    html: string
    metadata: HeaderHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        metadata: HeaderHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}