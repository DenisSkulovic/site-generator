import { BlockTemplateEnum } from "../../../../../page_cls_module/build_browser"

const defaultFields: Map<BlockTemplateEnum, { [key: string]: any }> = new Map([
    [BlockTemplateEnum.IMAGE, {
        "imgSrc": "",
        "imgAlt": "",
    }],
    [BlockTemplateEnum.HTML, {
        "raw_html": "",
    }],
    [BlockTemplateEnum.TEXT, {
        "text": "",
        "tag": "",
    }],
    [BlockTemplateEnum.LINK, {
        "linkHref": "",
        "linkText": "",
    }],
    [BlockTemplateEnum.SEPARATOR, {
        "direction": "horizontal",
        "color": "black",
        "size": 1,
    }],
])

export default defaultFields