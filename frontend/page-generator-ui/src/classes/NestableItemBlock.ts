import { NestableItem } from "./NestableItem";
import type { BlockConfig, BlockContent } from "../../../../page_cls_module";
import editedBlockConfigMap from "../computed/pageConfig/editedBlockConfigMap";
import currentBlockConfigMap from "../computed/pageConfig/currentBlockConfigMap";
import editedBlockContentMap from "../computed/pageContent/editedBlockContentMap";
import currentBlockContentMap from "../computed/pageContent/currentBlockContentMap";
import displayBlockView from "../components/MainSidebar/func/displayBlockView";
import newBlockConfigMap from "@/state/pageConfig/newBlockConfigMap";
import newBlockContentMap from "@/state/pageContent/newBlockContentMap";
import unsetHoveredAreaBlockClasses from "../logic/unsetHoveredAreaBlockClasses";
import unsetSelectedAreaBlockClasses from "../logic/unsetSelectedAreaBlockClasses";
import { cloneDeep } from "lodash";
import defaultBlockFieldMap from "../config/defaultFields/blockContent";

export class NestableItemBlock extends NestableItem {
    constructor(id: string, children: NestableItem[]) {
        super(id, children);
    }

    // PRIVATE
    private getBlock(type: 'config' | 'content', which: "current" | "edit"): BlockConfig | BlockContent {
        if (this.isNew && which === "current") throw new Error(`cannot get ${type} for a new item`);

        let block: BlockConfig | BlockContent | undefined;
        let sourceMap;

        switch (type) {
            case 'config':
                sourceMap = which === "edit" ? editedBlockConfigMap : currentBlockConfigMap;
                block = this.isNew ? newBlockConfigMap.value.get(this.id) : sourceMap.value.get(this.id);
                break;
            case 'content':
                sourceMap = which === "edit" ? editedBlockContentMap : currentBlockContentMap;
                block = this.isNew ? newBlockContentMap.value.get(this.contentId) : sourceMap.value.get(this.contentId);
                break;
        }

        if (!block) throw new Error(`${type} cannot be undefined`);
        return block;
    }

    private get isBlockConfigEdited(): boolean {
        return !this.isNew && JSON.stringify(this.blockConfig_current) !== JSON.stringify(this.blockConfig_edit);
    }

    private get isBlockContentEdited(): boolean {
        return !this.isNew && JSON.stringify(this.blockContent_current) !== JSON.stringify(this.blockContent_edit);
    }

    // PUBLIC
    public override get isEdited(): boolean {
        return this.isBlockConfigEdited || this.isBlockContentEdited;
    }

    public get blockConfig_current(): BlockConfig {
        return this.getBlock('config', 'current') as BlockConfig;
    }

    public get blockConfig_edit(): BlockConfig {
        return this.getBlock('config', 'edit') as BlockConfig;
    }

    public get blockContent_current(): BlockContent {
        return this.getBlock('content', 'current') as BlockContent;
    }

    public get blockContent_edit(): BlockContent {
        return this.getBlock('content', 'edit') as BlockContent;
    }

    public override resetConfigAndContent(): void {
        this.resetConfig();
        this.resetContent();
    }

    public override get isConfigEdited(): boolean {
        return this.isBlockConfigEdited;
    }

    public override get isContentEdited(): boolean {
        return this.isBlockContentEdited;
    }

    public override resetConfig(): void {
        if (this.isNew) throw new Error("cannot reset a new config");
        const originalConfigClone: BlockConfig = cloneDeep(this.blockConfig_current);
        Object.assign(this.blockConfig_edit, originalConfigClone);
    }

    public override resetContent(): void {
        if (this.isNew) throw new Error("cannot reset a new content");
        const originalContentClone: BlockContent = cloneDeep(this.blockContent_current);
        Object.assign(this.blockContent_edit, originalContentClone);
    }

    public display() {
        displayBlockView(this);
    }

    public override displayAsSelected() {
        unsetSelectedAreaBlockClasses();
        const blockEl = document.querySelector(`[data-block-uuid="${this.id}"]`);
        if (blockEl) {
            blockEl.classList.add("currently-selected-block");
        }
    }

    public override displayAsHovered() {
        unsetHoveredAreaBlockClasses();
        const blockEl = document.querySelector(`[data-block-uuid="${this.id}"]`);
        if (blockEl) {
            blockEl.classList.add("currently-hovered-block");
        }
    }

    public setDefaultFields() {
        const defaultFields = cloneDeep(defaultBlockFieldMap.get(this.blockConfig_edit.blockTemplateName));
        if (!defaultFields) return;
        Object.assign(this.blockContent_edit.data, defaultFields);
    }
}
