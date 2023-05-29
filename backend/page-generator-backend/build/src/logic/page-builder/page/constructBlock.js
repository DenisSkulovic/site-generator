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
const DTO = __importStar(require("@page_cls_module"));
const guid_1 = __importDefault(require("../../../utils/guid"));
const getDirName_1 = __importDefault(require("../../../utils/getDirName"));
const ejs_1 = __importDefault(require("ejs"));
const RenderData_Block_1 = require("../../../classes/renderData/blocks/RenderData_Block");
const constructBlock = async (blockContent, blockConfig) => {
    const __dirname = (0, getDirName_1.default)();
    const bootstrapVersion = blockConfig.bootstrapVersion;
    const blockTemplateName = blockConfig.blockTemplateName;
    const uuid = (0, guid_1.default)();
    const createdTimestamp = Date.now();
    const updatedTimestamp = createdTimestamp;
    const blockTemplatePath = `${__dirname}/templates/html/${bootstrapVersion}/blocks/${blockTemplateName}/index.ejs`;
    const blockRenderData = new RenderData_Block_1.RenderData_Block(blockContent, blockConfig);
    const blockHtml = await ejs_1.default.renderFile(blockTemplatePath, blockRenderData);
    const blockMetadata = new DTO.BlockHTMLMetadata(createdTimestamp, updatedTimestamp);
    const res = new DTO.BlockHTMLObject(uuid, blockHtml, blockConfig, blockContent, blockMetadata);
    return res;
};
exports.default = constructBlock;
//# sourceMappingURL=constructBlock.js.map