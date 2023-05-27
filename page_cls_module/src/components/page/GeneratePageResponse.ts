import {PageHTMLObject} from "./HTMLObject/PageHTMLObject"

export class GeneratePageResponse {
    data: PageHTMLObject
    clazz: string
    constructor(
        data: PageHTMLObject
    ) {
        this.data = data
        this.clazz = this.constructor.name
    }
}