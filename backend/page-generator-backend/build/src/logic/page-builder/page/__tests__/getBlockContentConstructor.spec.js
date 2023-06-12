"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const _page_cls_module_1 = require("@page_cls_module");
const getBlockContentConstructor_1 = __importDefault(require("../getBlockContentConstructor"));
const mockFactories_1 = require("../../../../../../../page_cls_module/src/mockFactories");
// Mock blockContentsArr
jest.mock("../../../../config/blockContentsArr", () => {
    return [
        _page_cls_module_1.BlockContent_TEXT,
        _page_cls_module_1.BlockContent_HTML,
    ];
});
describe("getBlockContentConstructor", () => {
    it("should return correct constructor when template is TEXT", () => {
        const template = _page_cls_module_1.BlockTemplateEnum.TEXT;
        const constructor = (0, getBlockContentConstructor_1.default)(template);
        expect(constructor).toBe((0, mockFactories_1.createBlockContent_TEXT)({}));
    });
    it("should return correct constructor when template is HTML", () => {
        const template = _page_cls_module_1.BlockTemplateEnum.HTML;
        const constructor = (0, getBlockContentConstructor_1.default)(template);
        expect(constructor).toBe((0, mockFactories_1.createBlockContent_HTML)({}));
    });
    it("should return undefined when no constructor matches the template", () => {
        const template = "nonsense";
        const constructor = (0, getBlockContentConstructor_1.default)(template);
        expect(constructor).toBeUndefined();
    });
});
//# sourceMappingURL=getBlockContentConstructor.spec.js.map