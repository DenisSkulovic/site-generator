"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const _page_cls_module_1 = require("@page_cls_module");
const constructArea_1 = require("../constructArea");
const mockFactories_1 = require("../../../../../../../page_cls_module/src/mockFactories");
describe("constructArea", () => {
    const mockAreaConfig = (0, mockFactories_1.createAreaConfig)({ childConfigArr: [], bootstrapVersion: _page_cls_module_1.BootstrapVersionEnum.BOOTSTRAP_5_0_2 });
    const mockAreaContent = (0, mockFactories_1.createAreaContent)({});
    test("Should create a valid AreaHTMLObject instance", async () => {
        const result = await (0, constructArea_1.constructArea)(mockAreaConfig, mockAreaContent);
        expect(result).toBeInstanceOf(_page_cls_module_1.AreaHTMLObject);
    });
    test("Should throw an error when areaConfig is not an instance of AreaConfig", async () => {
        await expect((0, constructArea_1.constructArea)({}, mockAreaContent)).rejects.toThrow();
    });
    test("Should throw an error when areaContent is not an instance of AreaContent", async () => {
        await expect((0, constructArea_1.constructArea)(mockAreaConfig, {})).rejects.toThrow();
    });
    test("Should throw an error when areaConfig.childConfigArr has invalid items", async () => {
        const invalidAreaConfig = (0, mockFactories_1.createAreaConfig)({ childConfigArr: [{}], bootstrapVersion: _page_cls_module_1.BootstrapVersionEnum.BOOTSTRAP_5_0_2 });
        await expect((0, constructArea_1.constructArea)(invalidAreaConfig, mockAreaContent)).rejects.toThrow();
    });
});
describe("constructChildHTMLObject", () => {
    const mockAreaConfig = (0, mockFactories_1.createAreaConfig)({ uuid: "test-area-uuid" });
    const mockBlockConfig = (0, mockFactories_1.createBlockConfig)({ uuid: "test-block-uuid" });
    const mockAreaContent = (0, mockFactories_1.createAreaContent)({ data: { "test-area-uuid": (0, mockFactories_1.createAreaContent)({}) } });
    const mockBlockContent = (0, mockFactories_1.createBlockContent)({ data: { "test-block-uuid": (0, mockFactories_1.createBlockContent)({}) } });
    test("Should create a valid AreaHTMLObject instance", async () => {
        const result = await (0, constructArea_1.constructChildHTMLObject)(mockAreaConfig, mockAreaContent, jest.fn());
        expect(result).toBeInstanceOf(_page_cls_module_1.AreaHTMLObject);
    });
    test("Should create a valid BlockHTMLObject instance", async () => {
        const result = await (0, constructArea_1.constructChildHTMLObject)(mockBlockConfig, mockBlockContent, jest.fn());
        expect(result).toBeInstanceOf(_page_cls_module_1.BlockHTMLObject);
    });
    test("Should throw an error when childConfig is neither an instance of AreaConfig nor BlockConfig", async () => {
        await expect((0, constructArea_1.constructChildHTMLObject)({}, mockAreaContent, jest.fn())).rejects.toThrow();
    });
    test("Should throw an error when areaContent.data[childConfig.uuid] is undefined", async () => {
        const undefinedAreaContent = (0, mockFactories_1.createAreaContent)({});
        await expect((0, constructArea_1.constructChildHTMLObject)(mockAreaConfig, undefinedAreaContent, jest.fn())).rejects.toThrow();
    });
    test("Should throw an error when areaContent.data[childConfig.uuid] is not an instance of AreaContent or BlockContent", async () => {
        const invalidAreaContent = (0, mockFactories_1.createAreaContent)({ data: { "test-area-uuid": {} } });
        await expect((0, constructArea_1.constructChildHTMLObject)(mockAreaConfig, invalidAreaContent, jest.fn())).rejects.toThrow();
    });
});
describe("getClassString", () => {
    const mockAreaConfig = (0, mockFactories_1.createAreaConfig)({ justify: "justify-content-center", align: "align-items-center", isIncludeContainer: true });
    test("Should return a correct class string", () => {
        const result = (0, constructArea_1.getClassString)(mockAreaConfig);
        expect(result).toEqual("justify-content-center align-items-center container");
    });
    test("Should return an empty string when areaConfig does not have justify, align or isIncludeContainer", () => {
        const emptyAreaConfig = (0, mockFactories_1.createAreaConfig)({});
        const result = (0, constructArea_1.getClassString)(emptyAreaConfig);
        expect(result).toEqual("");
    });
});
describe("getCols", () => {
    test("Should return a correct cols array", () => {
        const result = (0, constructArea_1.getCols)(_page_cls_module_1.AreaLayoutEnum.LAYOUT_3_6_3);
        expect(result).toEqual([3, 6, 3]);
    });
    test("Should return an empty array when areaTemplateName is null", () => {
        const result = (0, constructArea_1.getCols)(null);
        expect(result).toEqual([]);
    });
});
//# sourceMappingURL=constructArea.spec.js.map