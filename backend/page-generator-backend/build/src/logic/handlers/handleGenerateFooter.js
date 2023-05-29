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
const generateFooterHTML_1 = __importDefault(require("../page-builder/footer/generateFooterHTML"));
const handleGenerateFooter = async (requestData) => {
    console.log(`>>> handleGenerateFooter`);
    const content = requestData.content;
    const config = requestData.config;
    const footerHTMLObject = await (0, generateFooterHTML_1.default)(config, content);
    const resp = new DTO.GenerateFooterResponse(footerHTMLObject);
    console.log(`handleGenerateFooter resp`, resp);
    console.log(`<<< handleGenerateFooter`);
    return resp;
};
exports.default = handleGenerateFooter;
//# sourceMappingURL=handleGenerateFooter.js.map