import { nestableConfig } from "@/state/nestableState";
import { newAreaConfigMap, newBlockConfigMap } from "@/state/pageConfigState";
import nestableItemMap from "../computed/nestable/nestableItemMap";
import handleDisplayNestableItem from "../logic/handlers/handleDisplayNestableItem";
import idToIdMap from "@/state/idToIdMap";

type ConfigUUID = string;

export abstract class NestableItem {
    id: ConfigUUID;
    children: NestableItem[];

    constructor(id: ConfigUUID, children: NestableItem[]) {
        this.id = id;
        this.children = children;
    }

    public get contentId(): string {
        const contentId: string | undefined = idToIdMap.value.get(this.id);
        if (!contentId) {
            console.error(this);
            throw new Error(`could not locate content id for config id: ${this.id}`);
        }
        return contentId;
    }

    public get isToDelete(): boolean {
        return !!nestableConfig.toDelete.find(item => item.id === this.id);
    }

    public get parentNestableItem(): NestableItem | null {
        return Array.from(nestableItemMap.value.values()).find(
            item => !!item.children.find(child => child.id === this.id)
        ) ?? null;
    }

    public moveItemToDelete(): void {
        console.log(`moveItemToDelete`);
        const parent: NestableItem | null = this.parentNestableItem;
        if (parent) {
            console.log(`had parent`);
            parent.children = parent.children.filter(child => child.id !== this.id);
        } else {
            console.log(`didnt have parent`);
            nestableConfig.config = nestableConfig.config.filter(child => child.id !== this.id);
        }

        if (!this.isNew) nestableConfig.toDelete.push(this);
    }

    public display() {
        handleDisplayNestableItem(this);
    }

    public get isNew(): boolean {
        return !!newAreaConfigMap.value.get(this.id) || !!newBlockConfigMap.value.get(this.id);
    }

    public abstract displayAsSelected(): void;

    public abstract displayAsHovered(): void;

    public abstract resetConfigAndContent(): void;

    public abstract resetContent(): void;

    public abstract get isConfigEdited(): boolean;

    public abstract get isContentEdited(): boolean;

    public abstract resetConfig(): void;

    public abstract get isEdited(): boolean;
}
