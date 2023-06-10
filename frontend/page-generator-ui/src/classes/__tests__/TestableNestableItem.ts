import { NestableItem } from "../NestableItem";

export class TestableNestableItem extends NestableItem {
    displayAsSelected(): void { }
    displayAsHovered(): void { }
    resetConfigAndContent(): void { }
    resetContent(): void { }
    get isConfigEdited(): boolean { return false; }
    get isContentEdited(): boolean { return false; }
    resetConfig(): void { }
    get isEdited(): boolean { return false; }
}

TestableNestableItem