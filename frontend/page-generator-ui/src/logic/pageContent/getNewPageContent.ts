import { reactive } from "vue";
import { PageContent, PageContentMetadata } from "../../../../../page_cls_module/src";
import type { AreaContent } from "../../../../../page_cls_module/src";
import getUUID from "../../utils/getUUID";

const getNewPageContent = (): PageContent => {
    const uuid = getUUID()
    const data: {
        [areaConfigId: string]: AreaContent;
    } = {}
    const now: number = Date.now()
    const createdTimestamp = now
    const updatedTimestamp = now

    const metadata: PageContentMetadata = new PageContentMetadata(
        createdTimestamp,
        updatedTimestamp,
    )

    const obj: PageContent = reactive(new PageContent(
        uuid,
        data,
        metadata,
    ))

    return obj
}

export default getNewPageContent