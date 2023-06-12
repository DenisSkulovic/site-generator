"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const constructBlock_1 = __importStar(require("../constructBlock")); // Update with the path to your module
const _page_cls_module_1 = require("@page_cls_module");
const RenderData_Block_1 = require("@/classes/renderData/blocks/RenderData_Block");
const ejs_1 = __importDefault(require("ejs"));
const mockFactories_1 = require("../../../../../../../page_cls_module/src/mockFactories");
const getDirName_1 = __importDefault(require("@/utils/getDirName"));
const guid_1 = __importDefault(require("@/utils/guid"));
jest.mock('ejs', () => ({
    renderFile: jest.fn(),
}));
jest.mock('../../../utils/guid', () => jest.fn());
jest.mock('../../../utils/getDirName', () => jest.fn());
describe("getTemplatePath", () => {
    test("Should return the correct template path", () => {
        const __dirname = '/some/dir';
        const bootstrapVersion = _page_cls_module_1.BootstrapVersionEnum.BOOTSTRAP_5_0_2;
        const blockTemplateName = _page_cls_module_1.BlockTemplateEnum.HTML;
        const templatePath = (0, constructBlock_1.getTemplatePath)(__dirname, bootstrapVersion, blockTemplateName);
        expect(templatePath).toBe('/some/dir/templates/html/VERSION_4/blocks/SOME_TEMPLATE/index.ejs');
    });
});
describe("buildBlockHTMLObject", () => {
    test("Should return a BlockHTMLObject instance", async () => {
        const uuid = '123';
        const blockHtml = '<p>Some HTML</p>';
        const blockConfig = (0, mockFactories_1.createBlockConfig)({});
        const blockContent = (0, mockFactories_1.createBlockContent)({});
        const blockMetadata = (0, mockFactories_1.createMetadata)({});
        const blockHTMLObject = await (0, constructBlock_1.buildBlockHTMLObject)(uuid, blockHtml, blockConfig, blockContent, blockMetadata);
        expect(blockHTMLObject).toBeInstanceOf(_page_cls_module_1.BlockHTMLObject);
        expect(blockHTMLObject.html).toBe(blockHtml);
        expect(blockHTMLObject.config).toBe(blockConfig);
        expect(blockHTMLObject.content).toBe(blockContent);
        expect(blockHTMLObject.metadata).toBe(blockMetadata);
    });
    test("Should throw an error when parameters are not valid", async () => {
        // Testing for parameters being null
        await expect((0, constructBlock_1.buildBlockHTMLObject)(null, null, null, null, null)).rejects.toThrowError();
        // Testing for parameters being undefined
        await expect((0, constructBlock_1.buildBlockHTMLObject)(undefined, undefined, undefined, undefined, undefined)).rejects.toThrowError();
    });
});
describe("buildRenderDataBlock", () => {
    test("Should return a RenderData_Block instance", () => {
        const blockConfig = (0, mockFactories_1.createBlockConfig)({});
        const blockContent = (0, mockFactories_1.createBlockContent)({});
        const renderDataBlock = (0, constructBlock_1.buildRenderDataBlock)(blockContent, blockConfig);
        expect(renderDataBlock).toBeInstanceOf(RenderData_Block_1.RenderData_Block);
    });
    test("Should throw an error when parameters are not valid", () => {
        // Testing for parameters being null
        expect(() => (0, constructBlock_1.buildRenderDataBlock)(null, null)).toThrowError();
        // Testing for parameters being undefined
        expect(() => (0, constructBlock_1.buildRenderDataBlock)(undefined, undefined)).toThrowError();
    });
});
jest.mock('ejs', () => {
    return {
        renderFile: jest.fn(),
    };
});
jest.mock('fs');
describe("renderEjsFile", () => {
    test("Should return the correct HTML string", async () => {
        ejs_1.default.renderFile.mockResolvedValue('<p>Rendered HTML</p>');
        const templatePath = '/valid/path';
        const renderDataBlock = new RenderData_Block_1.RenderData_Block((0, mockFactories_1.createBlockContent)({}), (0, mockFactories_1.createBlockConfig)({}));
        const result = await (0, constructBlock_1.renderEjsFile)(templatePath, renderDataBlock);
        expect(result).toBe('<p>Rendered HTML</p>');
    });
    test("Should throw an error when template path does not exist", async () => {
        const templatePath = '/invalid/path';
        const renderDataBlock = new RenderData_Block_1.RenderData_Block((0, mockFactories_1.createBlockContent)({}), (0, mockFactories_1.createBlockConfig)({}));
        await expect((0, constructBlock_1.renderEjsFile)(templatePath, renderDataBlock)).rejects.toThrow();
    });
});
describe('constructBlock', () => {
    test('Should return a BlockHTMLObject instance', async () => {
        const blockContent = (0, mockFactories_1.createBlockContent)({});
        const blockConfig = (0, mockFactories_1.createBlockConfig)({});
        const __dirname = '/valid/dir';
        const bootstrapVersion = _page_cls_module_1.BootstrapVersionEnum.BOOTSTRAP_5_0_2;
        const blockTemplateName = _page_cls_module_1.BlockTemplateEnum.HTML;
        const uuid = '1234';
        const createdTimestamp = Date.now();
        const updatedTimestamp = createdTimestamp;
        const blockHtml = '<p>Some HTML</p>';
        // Mock implementations
        guid_1.default.mockReturnValue(uuid);
        getDirName_1.default.mockReturnValue(__dirname);
        ejs_1.default.renderFile.mockResolvedValue(blockHtml);
        const blockMetadata = (0, mockFactories_1.createBlockHTMLMetadata)({ createdTimestamp, updatedTimestamp });
        const expectedBlockHTMLObject = (0, constructBlock_1.buildBlockHTMLObject)(uuid, blockHtml, blockConfig, blockContent, blockMetadata);
        const blockHTMLObject = await (0, constructBlock_1.default)(blockContent, blockConfig);
        expect(blockHTMLObject).toEqual(expectedBlockHTMLObject);
    });
    test('Should throw an error when blockContent or blockConfig are not valid', async () => {
        const blockContent = (0, mockFactories_1.createBlockContent)({});
        const blockConfig = (0, mockFactories_1.createBlockConfig)({});
        // Testing for blockContent being null
        await expect((0, constructBlock_1.default)(null, blockConfig)).rejects.toThrowError();
        // Testing for blockContent being undefined
        await expect((0, constructBlock_1.default)(undefined, blockConfig)).rejects.toThrowError();
        // Testing for blockConfig being null
        await expect((0, constructBlock_1.default)(blockContent, null)).rejects.toThrowError();
        // Testing for blockConfig being undefined
        await expect((0, constructBlock_1.default)(blockContent, undefined)).rejects.toThrowError();
    });
});
//# sourceMappingURL=constructBlock.spec.js.map