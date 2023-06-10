import { NestableItemArea } from '../NestableItemArea';
import { AreaLayoutEnum } from "@page_cls_module";
import currentAreaConfigMap from "@/computed/pageConfig/currentAreaConfigMap";
import editedAreaConfigMap from "@/computed/pageConfig/editedAreaConfigMap";
import currentAreaContentMap from "@/computed/pageContent/currentAreaContentMap";
import editedAreaContentMap from "@/computed/pageContent/editedAreaContentMap";
import { newAreaConfigMap } from "@/state/pageConfigState";
import { newAreaContentMap } from "@/state/pageContentState";
import { TestableNestableItem } from './TestableNestableItem';

jest.mock("../computed/pageConfig/currentAreaConfigMap");
jest.mock("../computed/pageConfig/editedAreaConfigMap");
jest.mock("../computed/pageContent/currentAreaContentMap");
jest.mock("../computed/pageContent/editedAreaContentMap");
jest.mock("@/state/pageConfigState");
jest.mock("@/state/pageContentState");
jest.mock("../logic/handlers/handleAddNewArea");
jest.mock("../logic/handlers/handleAddNewBlock");

beforeEach(() => {
    jest.clearAllMocks();
});

describe('NestableItemArea', () => {
    let nestableItemArea: NestableItemArea;
    let mockChildren: TestableNestableItem[];

    beforeEach(() => {
        mockChildren = [
            new TestableNestableItem('child1'),
            new TestableNestableItem('child2')
        ];
        nestableItemArea = new NestableItemArea('testId', mockChildren);
    });

    it('should be created', () => {
        expect(nestableItemArea).toBeInstanceOf(NestableItemArea);
    });

    it('should properly compute isEdited', () => {
        // You can create test cases for when isAreaConfigEdited and isAreaContentEdited returns true or false.
        // Here's a sample
        nestableItemArea.isAreaConfigEdited = jest.fn().mockReturnValueOnce(false);
        nestableItemArea.isAreaContentEdited = jest.fn().mockReturnValueOnce(false);

        expect(nestableItemArea.isEdited).toBe(false);
    });

    it('should correctly calculate slotsUsed', () => {
        expect(nestableItemArea.slotsUsed).toBe(mockChildren.length);
    });

    it('should correctly calculate slotsMax for different area templates', () => {
        nestableItemArea.areaConfig_edit = { areaTemplateName: AreaLayoutEnum.LAYOUT_NONE };
        expect(nestableItemArea.slotsMax).toBe(NaN);

        nestableItemArea.areaConfig_edit = { areaTemplateName: 'LAYOUT_1_2' };
        expect(nestableItemArea.slotsMax).toBe(2);
    });

    it('should correctly determine if slots are available', () => {
        nestableItemArea.areaConfig_edit = { areaTemplateName: 'LAYOUT_1_2' };
        expect(nestableItemArea.isHaveSlotsAvailable).toBe(true);

        nestableItemArea.children.push(new TestableNestableItem('child3'));
        expect(nestableItemArea.isHaveSlotsAvailable).toBe(false);
    });

    it('should add a new area if slots are available', () => {
        nestableItemArea.isHaveSlotsAvailable = jest.fn().mockReturnValueOnce(true);
        const handleAddNewAreaMock = jest.fn();
        jest.mock('../logic/handlers/handleAddNewArea', () => handleAddNewAreaMock);

        nestableItemArea.addNewArea();
        expect(handleAddNewAreaMock).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when trying to add a new area if no slots are available', () => {
        nestableItemArea.isHaveSlotsAvailable = jest.fn().mockReturnValueOnce(false);

        expect(() => nestableItemArea.addNewArea()).toThrowError('cannot add another area');
    });


    it('should add a new block if slots are available', () => {
        nestableItemArea.isHaveSlotsAvailable = jest.fn().mockReturnValueOnce(true);
        const handleAddNewBlockMock = jest.fn();
        jest.mock('../logic/handlers/handleAddNewBlock', () => handleAddNewBlockMock);

        nestableItemArea.addNewBlock();
        expect(handleAddNewBlockMock).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when trying to add a new block if no slots are available', () => {
        nestableItemArea.isHaveSlotsAvailable = jest.fn().mockReturnValueOnce(false);

        expect(() => nestableItemArea.addNewBlock()).toThrowError('cannot add another block');
    });

    it('should display the area view', () => {
        const displayAreaViewMock = jest.fn();
        jest.mock('../components/MainSidebar/func/displayAreaView', () => displayAreaViewMock);

        nestableItemArea.display();
        expect(displayAreaViewMock).toHaveBeenCalledTimes(1);
    });

    it('should correctly add the "currently-selected-area" class', () => {
        document.body.innerHTML = `<div data-area-uuid="testId"></div>`;
        nestableItemArea.displayAsSelected();
        const blockEl = document.querySelector(`[data-area-uuid="testId"]`);
        expect(blockEl?.classList.contains('currently-selected-area')).toBeTruthy();
    });

    it('should correctly add the "currently-hovered-area" class', () => {
        document.body.innerHTML = `<div data-area-uuid="testId"></div>`;
        nestableItemArea.displayAsHovered();
        const blockEl = document.querySelector(`[data-area-uuid="testId"]`);
        expect(blockEl?.classList.contains('currently-hovered-area')).toBeTruthy();
    });

    it('should toggle collapse/expand state', () => {
        const initialCollapsedState = nestableItemArea.isCollapsed;
        nestableItemArea.toggleCollapseExpand();
        expect(nestableItemArea.isCollapsed).toBe(!initialCollapsedState);
    });

});
