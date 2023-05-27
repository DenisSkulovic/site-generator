import { BlockContent, BlockTemplateEnum } from "../../../../../../page_cls_module/src"
import blockContentsArr from "../../../config/blockContentsArr"

const getBlockContentConstructor = (template: BlockTemplateEnum): Constructor<BlockContent> | undefined => {
    // for e.g., template is TEXT, and the arr contains a class named BlockContent_TEXT, so it will find it
    return blockContentsArr.find((blockContentConstructor) => {
        return blockContentConstructor.name.endsWith(template)
    })
}

export default getBlockContentConstructor