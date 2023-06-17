import { NestableItem } from "./NestableItem";
import type { AreaConfig, AreaContent } from "../../../../page_cls_module/build_browser";
import { AreaLayoutEnum } from "../../../../page_cls_module/build_browser";
import currentAreaConfigMap from "../computed/pageConfig/currentAreaConfigMap";
import editedAreaConfigMap from "../computed/pageConfig/editedAreaConfigMap";
import currentAreaContentMap from "../computed/pageContent/currentAreaContentMap";
import editedAreaContentMap from "../computed/pageContent/editedAreaContentMap";
import { cloneDeep } from "lodash";
import handleAddNewArea from "../logic/handlers/handleAddNewArea";
import handleAddNewBlock from "../logic/handlers/handleAddNewBlock";
import displayAreaView from "../components/MainSidebar/func/displayAreaView";
import getNewAreaConfig from "@/logic/areaConfig/getNewAreaConfig";
import getNewAreaContent from "@/logic/areaContent/getNewAreaContent";
import unsetHoveredAreaBlockClasses from "../logic/unsetHoveredAreaBlockClasses";
import unsetSelectedAreaBlockClasses from "../logic/unsetSelectedAreaBlockClasses";
import { newAreaConfigMap } from "@/state/pageConfigState";
import { newAreaContentMap } from "@/state/pageContentState";

export class NestableItemArea extends NestableItem {
    public isCollapsed: boolean = false;
    constructor(id: string, children: NestableItem[]) {
        super(id, children);
    }

    public get isAreaConfigEdited(): boolean {
        if (this.isNew) return false;
        // cloning to remove the arrays that we don't count as edited or not
        const currentAreaConfigClone: AreaConfig = cloneDeep(this.areaConfig_current);
        const editAreaConfigClone: AreaConfig = cloneDeep(this.areaConfig_edit);
        currentAreaConfigClone['childConfigArr'] = [];
        editAreaConfigClone['childConfigArr'] = [];
        return JSON.stringify(currentAreaConfigClone) !== JSON.stringify(editAreaConfigClone);
    }

    public get isAreaContentEdited(): boolean {
        if (this.isNew) return false;
        return JSON.stringify(this.areaContent_current) !== JSON.stringify(this.areaContent_edit);
    }

    public getArea(type: 'config' | 'content', which: "current" | "edit"): AreaConfig | AreaContent {
        if (this.isNew && which === "current") throw new Error("cannot get area config/content for a new item");

        let area: AreaConfig | AreaContent | undefined;
        let sourceMap;

        switch (type) {
            case 'config':
                sourceMap = which === "edit" ? editedAreaConfigMap : currentAreaConfigMap;
                area = this.isNew ? newAreaConfigMap.value.get(this.id) : sourceMap.value.get(this.id);
                break;
            case 'content':
                sourceMap = which === "edit" ? editedAreaContentMap : currentAreaContentMap;
                area = this.isNew ? newAreaContentMap.value.get(this.contentId) : sourceMap.value.get(this.contentId);
                break;
        }

        if (!area) throw new Error("areaConfig/areaContent cannot be undefined");
        return area;
    }

    public override resetConfig(): void {
        let originalConfig: AreaConfig = this.isNew ? getNewAreaConfig() : cloneDeep(this.areaConfig_current);
        Object.assign(this.areaConfig_edit, originalConfig);
    }

    public override resetContent(): void {
        let originalContent: AreaContent = this.isNew ? getNewAreaContent() : cloneDeep(this.areaContent_current);
        Object.assign(this.areaContent_edit, originalContent);
    }

    // PUBLIC
    public override get isEdited(): boolean {
        return this.isAreaConfigEdited || this.isAreaContentEdited;
    }

    public get slotsUsed(): number {
        return this.children.length;
    }

    public get slotsMax(): number {
        const template: AreaLayoutEnum = this.areaConfig_edit.areaTemplateName;
        if (template === AreaLayoutEnum.LAYOUT_NONE) return NaN;
        const max = template.split("_").length;
        if (!max) throw new Error(`template ${template} probably missing from areaLayoutEnum`);
        return max;
    }

    public get isHaveSlotsAvailable(): boolean {
        return !!this.slotsMax ? this.slotsUsed < this.slotsMax : true;
    }

    public get isSlotsFull(): boolean {
        return !!this.slotsMax ? this.slotsUsed === this.slotsMax : false;
    }

    public get isSlotsTooMany(): boolean {
        return !!this.slotsMax ? this.slotsUsed > this.slotsMax : false;
    }

    public get areaConfig_current(): AreaConfig {
        return this.getArea('config', 'current') as AreaConfig;
    }

    public get areaConfig_edit(): AreaConfig {
        return this.getArea('config', 'edit') as AreaConfig;
    }

    public get areaContent_current(): AreaContent {
        return this.getArea('content', 'current') as AreaContent;
    }

    public get areaContent_edit(): AreaContent {
        return this.getArea('content', 'edit') as AreaContent;
    }

    public override resetConfigAndContent(): void {
        this.resetConfig();
        this.resetContent();
    }

    public addNewArea(): void {
        if (!this.isHaveSlotsAvailable) throw new Error("cannot add another area");
        handleAddNewArea(this.children);
    }

    public addNewBlock(): void {
        if (!this.isHaveSlotsAvailable) throw new Error("cannot add another block");
        handleAddNewBlock(this.children);
    }

    public override display() {
        displayAreaView(this);
    }

    public override displayAsSelected() {
        unsetSelectedAreaBlockClasses();
        const blockEl = document.querySelector(`[data-area-uuid="${this.id}"]`);
        if (blockEl) {
            blockEl.classList.add("currently-selected-area");
        }
    }

    public override displayAsHovered() {
        unsetHoveredAreaBlockClasses();
        const blockEl = document.querySelector(`[data-area-uuid="${this.id}"]`);
        if (blockEl) {
            blockEl.classList.add("currently-hovered-area");
        }
    }

    public toggleCollapseExpand() {
        this.isCollapsed = !this.isCollapsed;
    }

    
    public override get isConfigEdited(): boolean {
        return this.isAreaConfigEdited;
    }

    public override get isContentEdited(): boolean {
        return this.isAreaContentEdited;
    }
}
