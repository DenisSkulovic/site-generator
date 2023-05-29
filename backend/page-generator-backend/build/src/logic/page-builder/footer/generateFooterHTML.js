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
const ejs_1 = __importDefault(require("ejs"));
const getDirName_1 = __importDefault(require("../../../utils/getDirName"));
const guid_1 = __importDefault(require("../../../utils/guid"));
const RenderData_Footer_1 = require("../../../classes/renderData/pages/RenderData_Footer");
const generateFooterHTML = async (footerConfig, footerContent) => {
    const templateVersion = footerConfig.templateVersion;
    const bootstrapVersion = footerConfig.bootstrapVersion;
    const __dirname = (0, getDirName_1.default)();
    const templatePath = `${__dirname}/templates/html/${bootstrapVersion}/footer/${templateVersion}/index.ejs`;
    const uuid = (0, guid_1.default)();
    const footerRenderData = new RenderData_Footer_1.RenderData_Footer(footerContent, footerConfig);
    const html = await ejs_1.default.renderFile(templatePath, footerRenderData);
    const createdTimestamp = Date.now();
    const updatedTimestamp = createdTimestamp;
    const metadata = new DTO.FooterHTMLMetadata(createdTimestamp, updatedTimestamp);
    const res = new DTO.FooterHTMLObject(uuid, html, footerContent, footerConfig, metadata);
    return res;
};
exports.default = generateFooterHTML;
//# sourceMappingURL=generateFooterHTML.js.map