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
const generateHeaderHTML_1 = __importDefault(require("../../header/generateHeaderHTML"));
jest.mock('ejs', () => ({
    renderFile: jest.fn(),
}));
jest.mock('../../../utils/guid', () => jest.fn());
jest.mock('../../../utils/getDirName', () => jest.fn());
describe('generateHeaderHTML', () => {
    it('generates HeaderHTMLObject', async () => {
        ejs.renderFile.mockResolvedValue('<div>Mock Header</div>');
        guid_1.default.mockReturnValue('guid');
        getDirName_1.default.mockReturnValue('/mock/directory');
        const headerConfig = (0, mockFactories_1.createHeaderConfig)({});
        const headerContent = (0, mockFactories_1.createHeaderContent)({});
        const headerHTMLObject = await (0, generateHeaderHTML_1.default)(headerConfig, headerContent);
        expect(headerHTMLObject).toBeDefined();
        expect(headerHTMLObject.html).toEqual('<div>Mock Header</div>');
        // additional assertions
        expect(headerHTMLObject.uuid).toEqual('guid'); // assuming 'guid' function is used for uuid generation
        expect(headerHTMLObject.config).toEqual(headerConfig);
        expect(headerHTMLObject.content).toEqual(headerContent);
        expect(ejs.renderFile).toHaveBeenCalledWith(expect.stringContaining('/templates/html'), expect.any(Object)); // check if ejs.renderFile is called with expected templatePath
        expect(getDirName_1.default).toHaveBeenCalled(); // check if getDirName is called
        expect(guid_1.default).toHaveBeenCalled(); // check if guid is called
        expect(headerHTMLObject.metadata).toBeDefined(); // assuming that metadata object should be defined
        expect(headerHTMLObject.metadata.createdTimestamp).toBeDefined(); // assuming that createdTimestamp should be defined
        expect(headerHTMLObject.metadata.updatedTimestamp).toBeDefined(); // assuming that updatedTimestamp should be defined
    });
});
//# sourceMappingURL=generateHeaderHTML.spec.js.map