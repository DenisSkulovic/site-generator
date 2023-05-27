import { NestableItem } from "./NestableItem"
import type { AreaConfig, AreaContent } from "../../../../page_cls_module/src"
import { AreaLayoutEnum } from "../../../../page_cls_module/src"
import currentAreaConfigMap from "../computed/pageConfig/currentAreaConfigMap"
import editedAreaConfigMap from "../computed/pageConfig/editedAreaConfigMap"
import currentAreaContentMap from "../computed/pageContent/currentAreaContentMap"
import editedAreaContentMap from "../computed/pageContent/editedAreaContentMap"
import { cloneDeep } from "lodash"
import handleAddNewArea from "../logic/handlers/handleAddNewArea"
import handleAddNewBlock from "../logic/handlers/handleAddNewBlock"
import displayAreaView from "../components/MainSidebar/func/displayAreaView";
import getNewAreaConfig from "@/logic/areaConfig/getNewAreaConfig"
import getNewAreaContent from "@/logic/areaContent/getNewAreaContent"
import newAreaConfigMap from "@/state/pageConfig/newAreaConfigMap"
import newAreaContentMap from "@/state/pageContent/newAreaContentMap"
import unsetHoveredAreaBlockClasses from "../logic/unsetHoveredAreaBlockClasses"
import unsetSelectedAreaBlockClasses from "../logic/unsetSelectedAreaBlockClasses"

export class NestableItemArea extends NestableItem {
    constructor(
        id: string,
        children: NestableItem[]
    ) {
        super(id, children)
    }

    // PRIVATE
    private get isAreaConfigEdited(): boolean {
        if (this.isNew) return false
        // cloning to remove the arrays that we don't count as edited or not
        const currentAreaConfigClone: AreaConfig = cloneDeep(this.areaConfig_current)
        const editAreaConfigClone: AreaConfig = cloneDeep(this.areaConfig_edit)
        currentAreaConfigClone['childConfigArr'] = []
        editAreaConfigClone['childConfigArr'] = []
        return JSON.stringify(currentAreaConfigClone) !== JSON.stringify(editAreaConfigClone)
    }
    private get isAreaContentEdited(): boolean {
        if (this.isNew) return false
        return JSON.stringify(this.areaContent_current) !== JSON.stringify(this.areaContent_edit)
    }
    private getAreaConfig(which: "current" | "edit"): AreaConfig {
        if (this.isNew && which === "current") throw new Error("cannot get area config for a new item")

        let areaConfig: AreaConfig | undefined
        if (this.isNew) {
            areaConfig = newAreaConfigMap.value.get(this.id)
        } else {
            const sourceMap = which === "edit" ? editedAreaConfigMap : currentAreaConfigMap
            areaConfig = sourceMap.value.get(this.id)
        }

        if (!areaConfig) throw new Error("areaConfig cannot be undefined")
        return areaConfig
    }
    private getAreaContent(which: "current" | "edit"): AreaContent {
        if (this.isNew && which === "current") throw new Error("cannot get area content for a new item")

        let areaContent: AreaContent | undefined
        if (this.isNew) {
            areaContent = newAreaContentMap.value.get(this.contentId)
        } else {
            const sourceMap = which === "edit" ? editedAreaContentMap : currentAreaContentMap
            areaContent = sourceMap.value.get(this.contentId)
        }
        if (!areaContent) throw new Error("areaContent cannot be undefined")
        return areaContent
    }
    public override resetConfig(): void {
        let objToCopy: AreaConfig
        if (this.isNew) {
            objToCopy = getNewAreaConfig()
        } else {
            objToCopy = cloneDeep(this.areaConfig_current)
        }
        Object.entries(objToCopy).forEach((entry) => {
            const key = entry[0]
            const value = entry[1] as any
            if (key === "childConfigArr") return
            (this.areaConfig_edit as any)[key] = value
        })
    }
    public override resetContent(): void {
        let objToCopy: AreaContent
        if (this.isNew) {
            objToCopy = getNewAreaContent()
        } else {
            objToCopy = cloneDeep(this.areaContent_current)
        }
        Object.entries(objToCopy).forEach((entry) => {
            const key = entry[0]
            const value = entry[1] as any
            (this.areaContent_edit as any)[key] = value
        })
    }


    // PUBLIC


    public override get isEdited(): boolean {
        return this.isAreaConfigEdited || this.isAreaContentEdited
    }
    public get slotsUsed(): number {
        const used: number = this.children.length
        return used
    }
    public get slotsMax(): number {
        const template: AreaLayoutEnum = this.areaConfig_edit.areaTemplateName
        if (template === AreaLayoutEnum.LAYOUT_NONE) return NaN
        const max = template.split("_").length
        if (!max) throw new Error(`template ${template} probably missing from areaLayoutEnum`)
        return max
    }
    public get isHaveSlotsAvailable(): boolean {
        if (!this.slotsMax) return false
        return this.slotsUsed < this.slotsMax
    }
    public get isSlotsFull(): boolean {
        if (!this.slotsMax) return true
        return this.slotsUsed === this.slotsMax
    }
    public get isSlotsTooMany(): boolean {
        if (!this.slotsMax) return false
        return this.slotsUsed > this.slotsMax
    }
    public get areaConfig_current(): AreaConfig {
        if (this.isNew) throw new Error("new items cannot have current config")
        return this.getAreaConfig("current")
    }
    public get areaConfig_edit(): AreaConfig {
        return this.getAreaConfig("edit")
    }
    public get areaContent_current(): AreaContent {
        if (this.isNew) throw new Error("new items cannot have current content")
        return this.getAreaContent("current")
    }
    public get areaContent_edit(): AreaContent {
        return this.getAreaContent("edit")
    }
    public get isConfigEdited(): boolean {
        if (this.isNew || !this.areaConfig_current || !this.areaConfig_edit) return false
        const currentClone: AreaConfig = cloneDeep(this.areaConfig_current)
        const editClone: AreaConfig = cloneDeep(this.areaConfig_edit)
        currentClone['childConfigArr'] = [] // we dont care about subitems, only config fields
        editClone['childConfigArr'] = [] // we dont care about subitems, only config fields
        return JSON.stringify(currentClone) !== JSON.stringify(editClone)
    }

    public override resetConfigAndContent(): void {
        this.resetConfig()
        this.resetContent()
    }

    public addNewArea(): void {
        if (!!this.slotsMax && !this.isHaveSlotsAvailable) throw new Error("cannot add another area")
        handleAddNewArea(this.children)
    }
    public addNewBlock(): void {
        if (!!this.slotsMax && !this.isHaveSlotsAvailable) throw new Error("cannot add another block")
        handleAddNewBlock(this.children)
    }
    public override display() {
        displayAreaView(this)
    }


    public override displayAsSelected() {
        unsetSelectedAreaBlockClasses()
        const blockEl = document.querySelector(`[data-area-uuid="${this.id}"]`)
        if (blockEl) {
            blockEl.classList.add("currently-selected-area")
        }
    }
    public override displayAsHovered() {
        unsetHoveredAreaBlockClasses()
        const blockEl = document.querySelector(`[data-area-uuid="${this.id}"]`)
        if (blockEl) {
            blockEl.classList.add("currently-hovered-area")
        }
    }
}
