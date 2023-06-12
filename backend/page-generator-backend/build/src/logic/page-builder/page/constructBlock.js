"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEjsFile = exports.buildRenderDataBlock = exports.buildBlockHTMLObject = exports.getTemplatePath = void 0;
const _page_cls_module_1 = require("@page_cls_module");
const guid_1 = __importDefault(require("../../../utils/guid"));
const getDirName_1 = __importDefault(require("../../../utils/getDirName"));
const ejs_1 = __importDefault(require("ejs"));
const RenderData_Block_1 = require("../../../classes/renderData/blocks/RenderData_Block");
const getTemplatePath = (__dirname, bootstrapVersion, blockTemplateName) => {
    return `${__dirname}/templates/html/${bootstrapVersion}/blocks/${blockTemplateName}/index.ejs`;
};
exports.getTemplatePath = getTemplatePath;
const buildBlockHTMLObject = (uuid, blockHtml, blockConfig, blockContent, blockMetadata) => {
    return new _page_cls_module_1.BlockHTMLObject(uuid, blockHtml, blockConfig, blockContent, blockMetadata);
};
exports.buildBlockHTMLObject = buildBlockHTMLObject;
const buildRenderDataBlock = (blockContent, blockConfig) => {
    return new RenderData_Block_1.RenderData_Block(blockContent, blockConfig);
};
exports.buildRenderDataBlock = buildRenderDataBlock;
const renderEjsFile = async (path, renderData) => {
    return await ejs_1.default.renderFile(path, renderData);
};
exports.renderEjsFile = renderEjsFile;
const constructBlock = async (blockContent, blockConfig) => {
    const __dirname = (0, getDirName_1.default)();
    const bootstrapVersion = blockConfig.bootstrapVersion;
    const blockTemplateName = blockConfig.blockTemplateName;
    const uuid = (0, guid_1.default)();
    const createdTimestamp = Date.now();
    const updatedTimestamp = createdTimestamp;
    const blockTemplatePath = (0, exports.getTemplatePath)(__dirname, bootstrapVersion, blockTemplateName);
    const blockRenderData = (0, exports.buildRenderDataBlock)(blockContent, blockConfig);
    const blockHtml = await (0, exports.renderEjsFile)(blockTemplatePath, blockRenderData);
    const blockMetadata = new _page_cls_module_1.BlockHTMLMetadata(createdTimestamp, updatedTimestamp);
    const res = (0, exports.buildBlockHTMLObject)(uuid, blockHtml, blockConfig, blockContent, blockMetadata);
    return res;
};
exports.default = constructBlock;
//# sourceMappingURL=constructBlock.js.map