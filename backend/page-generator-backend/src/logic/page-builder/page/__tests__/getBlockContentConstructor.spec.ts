import { BlockContent_HTML, BlockContent_TEXT, BlockTemplateEnum } from "@page_cls_module";
import getBlockContentConstructor from "../getBlockContentConstructor";
import blockContentsArr from "../../../../config/blockContentsArr";
import { createBlockContent_TEXT, createBlockContent_HTML } from "../../../../../../../page_cls_module/src/mockFactories";


// Mock blockContentsArr
jest.mock("../../../../config/blockContentsArr", () => {
    return [
        BlockContent_TEXT,
        BlockContent_HTML,
    ];
});

describe("getBlockContentConstructor", () => {
    it("should return correct constructor when template is TEXT", () => {
        const template = BlockTemplateEnum.TEXT;
        const constructor = getBlockContentConstructor(template);
        expect(constructor).toBe(createBlockContent_TEXT({}));
    });

    it("should return correct constructor when template is HTML", () => {
        const template = BlockTemplateEnum.HTML;
        const constructor = getBlockContentConstructor(template);
        expect(constructor).toBe(createBlockContent_HTML({}));
    });

    it("should return undefined when no constructor matches the template", () => {
        const template = "nonsense" as unknown as BlockTemplateEnum;
        const constructor = getBlockContentConstructor(template);
        expect(constructor).toBeUndefined();
    });
});
