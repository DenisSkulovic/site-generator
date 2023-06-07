import { NestableItem } from "./NestableItem"
import type { BlockConfig, BlockContent } from "../../../../page_cls_module"
import editedBlockConfigMap from "../computed/pageConfig/editedBlockConfigMap"
import currentBlockConfigMap from "../computed/pageConfig/currentBlockConfigMap"
import editedBlockContentMap from "../computed/pageContent/editedBlockContentMap"
import currentBlockContentMap from "../computed/pageContent/currentBlockContentMap"
import displayBlockView from "../components/MainSidebar/func/displayBlockView";
import newBlockConfigMap from "@/state/pageConfig/newBlockConfigMap"
import newBlockContentMap from "@/state/pageContent/newBlockContentMap"
import unsetHoveredAreaBlockClasses from "../logic/unsetHoveredAreaBlockClasses"
import unsetSelectedAreaBlockClasses from "../logic/unsetSelectedAreaBlockClasses"
import { cloneDeep } from "lodash"
import defaultBlockFieldMap from "../config/defaultFields/blockContent"

export class NestableItemBlock extends NestableItem {
    constructor(
        id: string,
        children: NestableItem[]
    ) {
        super(id, children)
    }

    // PRIVATE
    private getBlockConfig(which: "current" | "edit"): BlockConfig {
        if (this.isNew && which === "current") throw new Error("cannot get block config for a new item")

        let blockConfig: BlockConfig | undefined
        if (this.isNew) {
            blockConfig = newBlockConfigMap.value.get(this.id)
        } else {
            const sourceMap = which === "edit" ? editedBlockConfigMap : currentBlockConfigMap
            blockConfig = sourceMap.value.get(this.id)
        }

        if (!blockConfig) throw new Error("blockConfig cannot be undefined")
        return blockConfig
    }
    private getBlockContent(which: "current" | "edit"): BlockContent {
        if (this.isNew && which === "current") throw new Error("cannot get block content for a new item")

        let blockContent: BlockContent | undefined
        if (this.isNew) {
            blockContent = newBlockContentMap.value.get(this.contentId)
        } else {
            const sourceMap = which === "edit" ? editedBlockContentMap : currentBlockContentMap
            blockContent = sourceMap.value.get(this.contentId)
        }
        if (!blockContent) throw new Error("blockContent cannot be undefined")
        return blockContent
    }
    private get isBlockConfigEdited(): boolean {
        if (this.isNew) return false
        return JSON.stringify(this.blockConfig_current) !== JSON.stringify(this.blockConfig_edit)
    }
    private get isBlockContentEdited(): boolean {
        if (this.isNew) return false
        return JSON.stringify(this.blockContent_current) !== JSON.stringify(this.blockContent_edit)
    }


    // PUBLIC

    public override get isEdited(): boolean {
        return this.isBlockConfigEdited || this.isBlockContentEdited
    }
    public get blockConfig_current(): BlockConfig {
        if (this.isNew) throw new Error("new items cannot have current config")
        return this.getBlockConfig("current")
    }
    public get blockConfig_edit(): BlockConfig {
        return this.getBlockConfig("edit")
    }
    public get blockContent_current(): BlockContent | null {
        if (this.isNew) throw new Error("new items cannot have current content")
        return this.getBlockContent("current")
    }
    public get blockContent_edit(): BlockContent {
        return this.getBlockContent("edit")
    }
    public override resetConfigAndContent(): void {
        this.resetConfig()
        this.resetContent()
    }
    public override get isConfigEdited(): boolean {
        if (this.isNew || !this.blockConfig_current || !this.blockConfig_edit) return false
        return JSON.stringify(this.blockConfig_current) !== JSON.stringify(this.blockConfig_edit)
    }
    public override get isContentEdited(): boolean {
        if (this.isNew || !this.blockContent_current || !this.blockContent_edit) return false
        return JSON.stringify(this.blockContent_current) !== JSON.stringify(this.blockContent_edit)
    }
    public override resetConfig(): void {
        if (this.isNew || !this.blockConfig_current) throw new Error("cannot reset a new config")
        const originalConfigClone: BlockConfig = cloneDeep(this.blockConfig_current)
        Object.entries(originalConfigClone).forEach((entry) => {
            const key = entry[0]
            const value = entry[1] as any
            (this.blockConfig_edit as any)[key] = value
        })
    }
    public override resetContent(): void {
        if (this.isNew || !this.blockContent_current) throw new Error("cannot reset a new content")
        const originalContentClone: BlockContent = cloneDeep(this.blockContent_current)
        Object.entries(originalContentClone).forEach((entry) => {
            const key = entry[0]
            const value = entry[1] as any
            (this.blockContent_edit as any)[key] = value
        })
    }

    public display() {
        displayBlockView(this)
    }

    public override displayAsSelected() {
        unsetSelectedAreaBlockClasses()
        const blockEl = document.querySelector(`[data-block-uuid="${this.id}"]`)
        if (blockEl) {
            blockEl.classList.add("currently-selected-block")
        }
    }
    public override displayAsHovered() {
        unsetHoveredAreaBlockClasses()
        const blockEl = document.querySelector(`[data-block-uuid="${this.id}"]`)
        if (blockEl) {
            blockEl.classList.add("currently-hovered-block")
        }
    }
    public setDefaultFields() {
        const defaultFields = cloneDeep(defaultBlockFieldMap.get(this.blockConfig_edit.blockTemplateName))
        if (!defaultFields) return
        Object.entries(defaultFields).forEach((entry) => {
            const key = entry[0]
            const value = entry[1]
            if (!this.blockContent_edit.data[key]) this.blockContent_edit.data[key] = value
        })
    }
}