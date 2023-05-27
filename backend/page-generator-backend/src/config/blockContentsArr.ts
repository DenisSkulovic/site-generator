import { BlockContent, BlockContent_IMAGE, BlockContent_TEXT, BlockContent_HTML } from "../../../../page_cls_module"

const blockContentsArr: Constructor<BlockContent>[] = [
    BlockContent_IMAGE,
    BlockContent_TEXT,
    BlockContent_HTML,
]

export default blockContentsArr