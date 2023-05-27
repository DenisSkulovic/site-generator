import {HeaderHTMLObject} from "../../"


export class GenerateHeaderResponse {
    
    data: HeaderHTMLObject
    clazz: string
    constructor(
        data: HeaderHTMLObject
    ) {
        this.data = data
        this.clazz = this.constructor.name
    }
}