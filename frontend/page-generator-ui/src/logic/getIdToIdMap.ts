import {AreaContent} from "../../../../page_cls_module"
import type {PageContent, BlockContent} from "../../../../page_cls_module"



const processData = (data: { // recursive function
    [configId: string]: AreaContent | BlockContent;
}, map: Map<string, string>) => {
    Object.entries(data).forEach((entry) => {
        const configId = entry[0]
        const content: AreaContent | BlockContent = entry[1]
        map.set(configId, content.uuid)
        map.set(content.uuid, configId)

        if (content instanceof AreaContent) { // continue recursion
            processData(content.data, map)
        }
    })
}

const getIdToIdMap = (pageContent: PageContent | undefined | null): Map<string, string> => {
    const map: Map<string, string> = new Map()
    if (!pageContent) return map

    processData(pageContent.data, map)

    return map
}

export default getIdToIdMap