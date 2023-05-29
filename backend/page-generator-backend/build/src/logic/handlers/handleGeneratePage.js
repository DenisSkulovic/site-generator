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
const constructPage_1 = __importDefault(require("../page-builder/page/constructPage"));
const fetchFooterFromDynamo_1 = __importDefault(require("../page-builder/footer/fetchFooterFromDynamo"));
const fetchHeaderFromDynamo_1 = __importDefault(require("../page-builder/header/fetchHeaderFromDynamo"));
const handleGeneratePage = async (requestData) => {
    console.log(`>>> handleGeneratePage`);
    const content = requestData.content;
    const config = requestData.config;
    const promises = [
        (0, fetchHeaderFromDynamo_1.default)(config.headerId),
        (0, fetchFooterFromDynamo_1.default)(config.footerId),
    ];
    const [headerHTMLObject, footerHTMLObject] = await Promise.all(promises);
    if (!headerHTMLObject)
        throw new Error("failed to fetch header");
    if (!footerHTMLObject)
        throw new Error("failed to fetch footer");
    const pageHTMLObject = await (0, constructPage_1.default)(content, config, headerHTMLObject, footerHTMLObject);
    const resp = new DTO.GeneratePageResponse(pageHTMLObject);
    console.log(`handleGeneratePage resp`, resp);
    console.log(`<<< handleGeneratePage`);
    return resp;
};
exports.default = handleGeneratePage;
//# sourceMappingURL=handleGeneratePage.js.map