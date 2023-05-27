import { AreaContent, buildAreaContent } from "./AreaContent"
import { PageContentMetadata, buildPageContentMetadata } from "./PageContentMetadata"


export const buildPageContent = (obj: any): PageContent => {
    if (obj.clazz !== "PageContent") throw new Error("clazz cannot be anything other than 'PageContent'")
    const rawData: { [areaConfigId: string]: any } = obj.data

    const uuid: string | undefined = obj.uuid
    if (!uuid) throw new Error("uuid cannot be undefined")
    const data: { [areaConfigId: string]: AreaContent } = {}
    Object.entries(rawData).forEach((entry) => {
        const areaConfigId: string = entry[0]
        const rawAreaContent = entry[1]
        const areaContent: AreaContent = buildAreaContent(rawAreaContent)
        data[areaConfigId] = areaContent
    })
    const metadata: PageContentMetadata = buildPageContentMetadata(obj.metadata)

    const pageContent: PageContent = new PageContent(
        uuid,
        data,
        metadata,
    )

    return pageContent
}

export class PageContent {
    uuid: string
    data: { [areaConfigId: string]: AreaContent }
    metadata: PageContentMetadata
    clazz: string
    constructor(
        uuid: string,
        data: { [areaConfigId: string]: AreaContent },
        metadata: PageContentMetadata,
    ) {
        this.uuid = uuid
        this.data = data
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}