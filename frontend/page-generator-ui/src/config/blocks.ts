import { BlockTemplateEnum } from "../../../../page_cls_module"
import FieldsEnum from "../enum/FieldsEnum"

type Option = {
    label: string,
    value: any
}

export class BlockDefinitionInput {
    label: string // this is used to display a name on the UI of the editor
    name: string // name is used inside the ejs template to access the value
    component: FieldsEnum
    options?: Option[]
    constructor(
        label: string,
        name: string,
        component: FieldsEnum,
        options?: Option[]
    ) {
        this.label = label
        this.name = name
        this.component = component
        this.options = options
    }
}

export class BlockDefinition {
    type: BlockTemplateEnum
    name: string
    image: string
    inputs: BlockDefinitionInput[]
    constructor(
        type: BlockTemplateEnum,
        name: string,
        image: string,
        inputs: BlockDefinitionInput[]
    ) {
        this.type = type
        this.name = name
        this.image = image
        this.inputs = inputs
    }
}

/** HTML */
const HTML: BlockDefinition = new BlockDefinition(
    BlockTemplateEnum.HTML,
    "Raw HTML",
    "www.google.com",
    [
        new BlockDefinitionInput("Raw HTML", "raw_html", FieldsEnum.TEXTAREA)
    ],
)

/** IMAGE */
const IMAGE: BlockDefinition = new BlockDefinition(
    BlockTemplateEnum.IMAGE,
    "Image",
    "www.google.com",
    [
        new BlockDefinitionInput("Image URL", "imgSrc", FieldsEnum.TEXT),
        new BlockDefinitionInput("Image Alt", "imgAlt", FieldsEnum.TEXT),
    ],
)


/** TEXT */
const tags = [
    { label: "", value: '' },
    { label: "h1", value: 'h1' },
    { label: "h2", value: 'h2' },
    { label: "h3", value: 'h3' },
    { label: "h4", value: 'h4' },
    { label: "h5", value: 'h5' },
    { label: "h6", value: 'h6' },
    { label: "p", value: 'p' },
    { label: "span", value: 'span' },
]
const TEXT: BlockDefinition = new BlockDefinition(
    BlockTemplateEnum.TEXT,
    "Text",
    "www.google.com",
    [
        new BlockDefinitionInput("Text", "text", FieldsEnum.TEXTAREA),
        new BlockDefinitionInput("Tag", "tag", FieldsEnum.SELECT, tags),
    ],
)


/** SEPARATOR */
const separators = [
    { label: "horizontal", value: 'horizontal' },
    { label: "vertical", value: 'vertical' },
]
const SEPARATOR: BlockDefinition = new BlockDefinition(
    BlockTemplateEnum.SEPARATOR,
    "Separator",
    "www.google.com",
    [
        new BlockDefinitionInput("Color", "color", FieldsEnum.TEXT),
        new BlockDefinitionInput("Direction", "direction", FieldsEnum.SELECT, separators),
    ],
)


/** LINK */
const LINK: BlockDefinition = new BlockDefinition(
    BlockTemplateEnum.LINK,
    "Link",
    "www.google.com",
    [
        new BlockDefinitionInput("Link URL", "linkHref", FieldsEnum.TEXT),
        new BlockDefinitionInput("Link Text", "linkText", FieldsEnum.TEXT),
        new BlockDefinitionInput("Classes", "classes", FieldsEnum.TEXT),
    ],
)


/** FINAL RESULT */
const arr: BlockDefinition[] = [
    HTML,
    IMAGE,
    TEXT,
    LINK,
    SEPARATOR,
]

export default arr