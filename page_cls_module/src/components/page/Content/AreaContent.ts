import { BlockContent, AreaContentMetadata, BlockContentMetadata } from "../../../"
import {buildBlockContent} from "./BlockContent"

export const buildAreaContent = (obj: any): AreaContent => {
    const uuid: string | undefined = obj.uuid
    if (!uuid) throw new Error('uuid cannoe be undefined')
    if (obj.clazz !== "AreaContent") throw new Error("clazz cannot be anything other than 'AreaContent'")
    const data: { [configId: string]: (AreaContent | BlockContent) } = {}
    const rawData: { [configId: string]: any } = obj.data
    Object.entries(rawData).forEach((entry) => {
        const configId: string = entry[0]
        const rawContent: any = entry[1]
        console.log(`rawContent`, rawContent)

        if (!rawContent.clazz) throw new Error("objects must have a 'clazz' value")
        if (rawContent.clazz === "AreaContent") {
            const areaContent: AreaContent = buildAreaContent(rawContent)
            data[configId] = areaContent
        } else if (rawContent.clazz === "BlockContent") {
            const blockContent: BlockContent = buildBlockContent(rawContent)
            data[configId] = blockContent
        } else {
            throw new Error("cannot process content of clazz: " + rawContent.clazz)
        }
    })
    const metadata: BlockContentMetadata = new BlockContentMetadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    const areaContent: AreaContent = new AreaContent(
        uuid,
        data,
        metadata,
    )
    return areaContent
}

export class AreaContent {
    uuid: string
    data: { [configId: string]: (AreaContent | BlockContent) }
    metadata: AreaContentMetadata
    clazz: string
    constructor(
        uuid: string,
        data: { [configId: string]: (AreaContent | BlockContent) },
        metadata: AreaContentMetadata,
    ) {
        this.uuid = uuid
        this.data = data
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}