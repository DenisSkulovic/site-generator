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
const RenderData_Page_1 = require("../../../classes/renderData/pages/RenderData_Page");
const constructArea_1 = __importDefault(require("./constructArea"));
const constructPage = async (pageContent, pageConfig, headerHTMLObject, footerHTMLObject) => {
    const templateVersion = pageConfig.templateVersion;
    const uuid = (0, guid_1.default)();
    const __dirname = (0, getDirName_1.default)();
    const skeletonTemplatePath = `${__dirname}/templates/html/${pageConfig.bootstrapVersion}/skeleton/${templateVersion}/index.ejs`;
    const areaConfigArr = pageConfig.areaConfigArr;
    const areasContentObject = pageContent.data;
    const areaHTMLObjectsPromiseArr = areaConfigArr.map(async (areaConfig) => {
        const areaContent = areasContentObject[areaConfig.uuid];
        if (!areaContent)
            throw new Error("areaContent cannot be undefined");
        const areaHTMLObject = await (0, constructArea_1.default)(areaConfig, areaContent);
        return areaHTMLObject;
    });
    const areaHTMLObjectsArr = await Promise.all(areaHTMLObjectsPromiseArr);
    const pageRenderData = new RenderData_Page_1.RenderData_Page(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject);
    const pageHtml = await ejs_1.default.renderFile(skeletonTemplatePath, pageRenderData);
    const createdTimestamp = Date.now();
    const updatedTimestamp = createdTimestamp;
    const pageMetadata = new DTO.PageHTMLMetadata(createdTimestamp, updatedTimestamp);
    const pageHTMLObject = new DTO.PageHTMLObject(uuid, pageHtml, pageConfig, pageContent, pageMetadata);
    return pageHTMLObject;
};
exports.default = constructPage;
//# sourceMappingURL=constructPage.js.map