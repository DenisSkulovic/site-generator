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
const getDirName_1 = __importDefault(require("@/utils/getDirName"));
const guid_1 = __importDefault(require("@/utils/guid"));
const ejs = __importStar(require("ejs"));
const mockFactories_1 = require("../../../../../../../page_cls_module/src/mockFactories");
const generateFooterHTML_1 = __importDefault(require("../generateFooterHTML"));
jest.mock('ejs', () => ({
    renderFile: jest.fn(),
}));
jest.mock('../../../utils/guid', () => jest.fn());
jest.mock('../../../utils/getDirName', () => jest.fn());
describe('generateFooterHTML', () => {
    it('generates FooterHTMLObject', async () => {
        ejs.renderFile.mockResolvedValue('<div>Mock Footer</div>');
        guid_1.default.mockReturnValue('guid');
        getDirName_1.default.mockReturnValue('/mock/directory');
        const footerConfig = (0, mockFactories_1.createFooterConfig)({});
        const footerContent = (0, mockFactories_1.createFooterContent)({});
        const footerHTMLObject = await (0, generateFooterHTML_1.default)(footerConfig, footerContent);
        expect(footerHTMLObject).toBeDefined();
        expect(footerHTMLObject.html).toEqual('<div>Mock Footer</div>');
        // additional assertions
        expect(footerHTMLObject.uuid).toEqual('guid'); // assuming 'guid' function is used for uuid generation
        expect(footerHTMLObject.config).toEqual(footerConfig);
        expect(footerHTMLObject.content).toEqual(footerContent);
        expect(ejs.renderFile).toHaveBeenCalledWith(expect.stringContaining('/templates/html'), expect.any(Object)); // check if ejs.renderFile is called with expected templatePath
        expect(getDirName_1.default).toHaveBeenCalled(); // check if getDirName is called
        expect(guid_1.default).toHaveBeenCalled(); // check if guid is called
        expect(footerHTMLObject.metadata).toBeDefined(); // assuming that metadata object should be defined
        expect(footerHTMLObject.metadata.createdTimestamp).toBeDefined(); // assuming that createdTimestamp should be defined
        expect(footerHTMLObject.metadata.updatedTimestamp).toBeDefined(); // assuming that updatedTimestamp should be defined
    });
});
//# sourceMappingURL=generateFooterHTML.spec.js.map