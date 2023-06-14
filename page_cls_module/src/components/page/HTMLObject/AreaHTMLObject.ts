import { AreaHTMLMetadata } from "../../../"
import {buildAreaHTMLMetadata} from "./AreaHTMLMetadata"

export const buildAreaHTMLObject = (obj: any): AreaHTMLObject => {
    if (obj.clazz !== "AreaHTMLObject") throw new Error("clazz cannot be anything other than 'AreaHTMLObject'")
    const areaMetadata: AreaHTMLMetadata = buildAreaHTMLMetadata(obj.areaMetadata)

    const areaHTMLObject: AreaHTMLObject = new AreaHTMLObject(
        obj.uuid,
        obj.html,
        areaMetadata,
    )
    return areaHTMLObject
}

export class AreaHTMLObject {
    uuid: string
    html: string
    metadata: AreaHTMLMetadata
    clazz: string
    constructor(
        uuid: string,
        html: string,
        metadata: AreaHTMLMetadata,
    ) {
        this.uuid = uuid
        this.html = html
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}