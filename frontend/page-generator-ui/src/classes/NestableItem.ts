import nestableItemMap from "../computed/nestable/nestableItemMap"
import nestableConfig from "../state/nestable/nestableConfig"
import handleDisplayNestableItem from "../logic/handlers/handleDisplayNestableItem"
import idToIdMap from "@/state/idToIdMap"
import newAreaConfigMap from "../state/pageConfig/newAreaConfigMap"
import newBlockConfigMap from "../state/pageConfig/newBlockConfigMap"

type ConfigUUID = string

export class NestableItem {
    id: ConfigUUID
    children: NestableItem[]
    constructor(
        id: ConfigUUID,
        children: NestableItem[],
    ) {
        this.id = id
        this.children = children
    }
    public get contentId(): string {
        const contentId: string | undefined = idToIdMap.value.get(this.id)
        if (!contentId) {
            console.error(this)
            throw new Error("could not locate content id for config id: " + this.id)
        }
        return contentId
    }
    public get isToDelete(): boolean {
        return !!nestableConfig.toDelete.find((item: NestableItem) => item.id === this.id)
    }
    public get parentNestableItem(): NestableItem | null {
        return Array.from(nestableItemMap.value.values()).find((item: NestableItem) => {
            return !!item.children.find((child) => child.id === this.id)
        }) || null
    }
    public moveItemToDelete(): void {
        console.log(`moveItemToDelete`)
        const parent: NestableItem | null = this.parentNestableItem
        if (parent) {
            console.log(`had parent`)
            parent.children = parent.children.filter((child) => child.id !== this.id)
        } else {
            console.log(`didnt have parent`)
            nestableConfig.config = nestableConfig.config.filter((child) => child.id !== this.id)
        }

        if (!this.isNew) nestableConfig.toDelete.push(this)
    }
    public display() {
        handleDisplayNestableItem(this)
    }
    public get isNew(): boolean {
        return !!newAreaConfigMap.value.get(this.id) || !!newBlockConfigMap.value.get(this.id)
    }

    public displayAsSelected() {
        throw new Error("must be implemented in the extending class")
    }
    public displayAsHovered() {
        throw new Error("must be implemented in the extending class")
    }
    public resetConfigAndContent() {
        throw new Error("must be implemented in the extending class")
    }
    public resetContent(): void {
        throw new Error("must be implemented in the extending class")
    }

    public get isConfigEdited(): boolean {
        throw new Error("must be implemented in the extending class")
    }
    public get isContentEdited() : boolean{
        throw new Error("must be implemented in the extending class")
    }
    public resetConfig(): void {
        throw new Error("must be implemented in the extending class")
    }
    public get isEdited(): boolean {
        throw new Error("must be implemented in the extending class")
    }
    
}