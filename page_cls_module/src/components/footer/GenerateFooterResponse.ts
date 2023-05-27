import { FooterHTMLObject } from "../../"


export class GenerateFooterResponse  {
    data: FooterHTMLObject
    clazz: string
    constructor(
        data: FooterHTMLObject
    ) {
        this.data = data
        this.clazz = this.constructor.name
    }
}