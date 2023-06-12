// @ts-nocheck
import { AreaConfig, AreaContent, BlockContent, BootstrapVersionEnum, AreaHTMLObject, BlockHTMLObject, AreaLayoutEnum } from "@page_cls_module";
import { constructArea, constructChildHTMLObject, getClassString, getCols } from "../constructArea";
import { createAreaConfig, createAreaContent, createBlockConfig, createBlockContent } from "../../../../../../../page_cls_module/src/mockFactories";

describe("constructArea", () => {
    const mockAreaConfig = createAreaConfig({ childConfigArr: [], bootstrapVersion: BootstrapVersionEnum.BOOTSTRAP_5_0_2 });
    const mockAreaContent = createAreaContent({});

    test("Should create a valid AreaHTMLObject instance", async () => {
        const result = await constructArea(mockAreaConfig, mockAreaContent);
        expect(result).toBeInstanceOf(AreaHTMLObject);
    });

    test("Should throw an error when areaConfig is not an instance of AreaConfig", async () => {
        await expect(constructArea({} as AreaConfig, mockAreaContent)).rejects.toThrow();
    });

    test("Should throw an error when areaContent is not an instance of AreaContent", async () => {
        await expect(constructArea(mockAreaConfig, {} as AreaContent)).rejects.toThrow();
    });

    test("Should throw an error when areaConfig.childConfigArr has invalid items", async () => {
        const invalidAreaConfig = createAreaConfig({ childConfigArr: [{} as AreaConfig], bootstrapVersion: BootstrapVersionEnum.BOOTSTRAP_5_0_2 });
        await expect(constructArea(invalidAreaConfig, mockAreaContent)).rejects.toThrow();
    });
});

describe("constructChildHTMLObject", () => {
    const mockAreaConfig = createAreaConfig({ uuid: "test-area-uuid" });
    const mockBlockConfig = createBlockConfig({ uuid: "test-block-uuid" });
    const mockAreaContent = createAreaContent({ data: { "test-area-uuid": createAreaContent({}) } });
    const mockBlockContent = createBlockContent({ data: { "test-block-uuid": createBlockContent({}) } });

    test("Should create a valid AreaHTMLObject instance", async () => {
        const result = await constructChildHTMLObject(mockAreaConfig, mockAreaContent, jest.fn());
        expect(result).toBeInstanceOf(AreaHTMLObject);
    });

    test("Should create a valid BlockHTMLObject instance", async () => {
        const result = await constructChildHTMLObject(mockBlockConfig, mockBlockContent, jest.fn());
        expect(result).toBeInstanceOf(BlockHTMLObject);
    });

    test("Should throw an error when childConfig is neither an instance of AreaConfig nor BlockConfig", async () => {
        await expect(constructChildHTMLObject({} as AreaConfig, mockAreaContent, jest.fn())).rejects.toThrow();
    });

    test("Should throw an error when areaContent.data[childConfig.uuid] is undefined", async () => {
        const undefinedAreaContent = createAreaContent({});
        await expect(constructChildHTMLObject(mockAreaConfig, undefinedAreaContent, jest.fn())).rejects.toThrow();
    });

    test("Should throw an error when areaContent.data[childConfig.uuid] is not an instance of AreaContent or BlockContent", async () => {
        const invalidAreaContent = createAreaContent({ data: { "test-area-uuid": {} as AreaContent | BlockContent } });
        await expect(constructChildHTMLObject(mockAreaConfig, invalidAreaContent, jest.fn())).rejects.toThrow();
    });
});

describe("getClassString", () => {
    const mockAreaConfig = createAreaConfig({ justify: "justify-content-center", align: "align-items-center", isIncludeContainer: true });

    test("Should return a correct class string", () => {
        const result = getClassString(mockAreaConfig);
        expect(result).toEqual("justify-content-center align-items-center container");
    });

    test("Should return an empty string when areaConfig does not have justify, align or isIncludeContainer", () => {
        const emptyAreaConfig = createAreaConfig({});
        const result = getClassString(emptyAreaConfig);
        expect(result).toEqual("");
    });
});

describe("getCols", () => {
    test("Should return a correct cols array", () => {
        const result = getCols(AreaLayoutEnum.LAYOUT_3_6_3);
        expect(result).toEqual([3, 6, 3]);
    });

    test("Should return an empty array when areaTemplateName is null", () => {
        const result = getCols(null as unknown as AreaLayoutEnum);
        expect(result).toEqual([]);
    });
});
