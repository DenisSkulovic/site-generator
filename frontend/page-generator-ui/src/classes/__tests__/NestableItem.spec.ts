import { NestableItem } from '../NestableItem';
import { nestableConfig } from "@/state/nestableState";
import { newAreaConfigMap, newBlockConfigMap } from "@/state/pageConfigState";
import nestableItemMap from "../computed/nestable/nestableItemMap";
import handleDisplayNestableItem from "../logic/handlers/handleDisplayNestableItem";
import idToIdMap from "@/state/idToIdMap";
import {TestableNestableItem} from "./TestableNestableItem"

// Tests
describe('NestableItem', () => {
    beforeEach(() => {
        // Reset maps and config for each test
        idToIdMap.value.clear();
        nestableConfig.toDelete = [];
    });

    it('should get contentId correctly', () => {
        idToIdMap.value.set('testId', 'testContentId');
        const item = new TestableNestableItem('testId', []);
        expect(item.contentId).toBe('testContentId');
    });

    it('should throw error if contentId not found', () => {
        const item = new TestableNestableItem('testId', []);
        expect(() => item.contentId).toThrowError('could not locate content id for config id: testId');
    });

    it('should return true if item is to be deleted', () => {
        const item = new TestableNestableItem('testId', []);
        nestableConfig.toDelete = [item];
        expect(item.isToDelete).toBe(true);
    });

    it('should return false if item is not to be deleted', () => {
        const item = new TestableNestableItem('testId', []);
        expect(item.isToDelete).toBe(false);
    });

    it('should find parent nestable item correctly', () => {
        const parent = new TestableNestableItem('parentId', []);
        const child = new TestableNestableItem('childId', []);
        parent.children.push(child);
        nestableItemMap.value.set('parentId', parent);

        expect(child.parentNestableItem).toBe(parent);
    });

    it('should return null if no parent found', () => {
        const item = new TestableNestableItem('testId', []);
        nestableItemMap.value.clear(); // Ensure there are no items in the map

        expect(item.parentNestableItem).toBeNull();
    });

    it('should move item to delete', () => {
        const parent = new TestableNestableItem('parentId', []);
        const child = new TestableNestableItem('childId', []);
        parent.children.push(child);
        nestableItemMap.value.set('parentId', parent);

        child.moveItemToDelete();

        expect(parent.children).not.toContain(child);
        expect(nestableConfig.toDelete).toContain(child);
    });

    it('should handle display', () => {
        const displaySpy = jest.spyOn(handleDisplayNestableItem, 'handleDisplayNestableItem');
        const item = new TestableNestableItem('testId', []);
        item.display();

        expect(displaySpy).toHaveBeenCalledWith(item);
    });

    it('should determine if new', () => {
        const areaItem = new TestableNestableItem('areaId', []);
        const blockItem = new TestableNestableItem('blockId', []);
        newAreaConfigMap.value.set('areaId', { /* mock config data */ });
        newBlockConfigMap.value.set('blockId', { /* mock config data */ });

        expect(areaItem.isNew).toBe(true);
        expect(blockItem.isNew).toBe(true);
        expect((new TestableNestableItem('otherId', [])).isNew).toBe(false);
    });

    it('should handle null or undefined id', () => {
        expect(() => new TestableNestableItem(undefined as any, [])).toThrow();
        expect(() => new TestableNestableItem(null as any, [])).toThrow();
    });

    it('should handle null or undefined children', () => {
        expect(() => new TestableNestableItem('id', undefined as any)).toThrow();
        expect(() => new TestableNestableItem('id', null as any)).toThrow();
    });

    it('should handle non-NestableItem children', () => {
        expect(() => new TestableNestableItem('id', ['notANestableItem'] as any)).toThrow();
    });

    it('should handle non-existent parent in moveItemToDelete', () => {
        const item = new TestableNestableItem('testId', []);
        nestableConfig.config = [item];

        expect(() => item.moveItemToDelete()).not.toThrow();
        expect(nestableConfig.config).not.toContain(item);
        expect(nestableConfig.toDelete).toContain(item);
    });

    afterAll(() => {
        jest.restoreAllMocks();  // Clean up all mocks
    });

});
