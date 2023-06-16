import { AreaContent, PageContentMetadata, PageContent } from "../../../../../page_cls_module/src";
import getUUID from "../getUUID";

const getNewPageContent = (): PageContent => {
    const now = Date.now()
    const uuid: string = getUUID()
    const data: {
        [areaConfigId: string]: AreaContent;
    } = {}

    const createdTimestamp = now
    const updatedTimestamp = now
    const metadata = new PageContentMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const obj: PageContent = new PageContent(
        uuid, data, metadata
    )
    return obj
}

export default getNewPageContent