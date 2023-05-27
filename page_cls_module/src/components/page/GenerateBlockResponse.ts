import { BlockHTMLObject } from "../../"

export class GenerateBlockResponse {
    data: BlockHTMLObject
    clazz: string

    constructor(
        data: BlockHTMLObject
    ) {
        this.data = data
        this.clazz = this.constructor.name
    }
}