import { AreaHTMLObject } from "../../"

export class GenerateAreaResponse {
    data: AreaHTMLObject
    clazz: string
    
    constructor(
        data: AreaHTMLObject
    ) {
        this.data = data
        this.clazz = this.constructor.name
    }
}