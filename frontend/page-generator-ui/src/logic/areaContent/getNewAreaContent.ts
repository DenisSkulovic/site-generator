import { reactive } from "vue"
import { AreaContent, AreaContentMetadata, BlockContent } from "../../../../../page_cls_module/build_browser" 
import getUUID from "../../utils/getUUID" 

const getNewAreaContent = (): AreaContent => {
    const now = Date.now()
    const uuid: string = getUUID()
    const data: {
        [configId: string]: AreaContent | BlockContent;
    } = {}

    const createdTimestamp = now
    const updatedTimestamp = now
    const metadata = new AreaContentMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const obj: AreaContent = reactive(new AreaContent(
        uuid,
        data,
        metadata,
    ))
    return obj
}

export default getNewAreaContent