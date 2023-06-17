import { reactive } from "vue"
import { BlockContent, BlockContentMetadata } from "../../../../../page_cls_module/build_browser" 
import getUUID from "../../utils/getUUID"


const getNewBlockContent = (): BlockContent => {
    const now = Date.now()
    const uuid: string = getUUID()
    const data: {
        [key: string]: any;
    } = {}

    const createdTimestamp = now
    const updatedTimestamp = now
    const metadata = new BlockContentMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const obj: BlockContent = reactive(new BlockContent(
        uuid,
        data,
        metadata,
    ))

    return obj
}


export default getNewBlockContent