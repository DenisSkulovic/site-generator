"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPage = exports.getSkeletonTemplatePath = exports.buildPageRenderData = exports.renderEjsFile = exports.buildPageHTMLMetadata = exports.buildPageHTMLObject = void 0;
const _page_cls_module_1 = require("@page_cls_module");
const RenderData_Page_1 = require("../../../classes/renderData/pages/RenderData_Page");
const ejs_1 = __importDefault(require("ejs"));
const buildPageHTMLObject = (uuid, pageHtml, pageConfig, pageContent, pageMetadata) => {
    return new _page_cls_module_1.PageHTMLObject(uuid, pageHtml, pageConfig, pageContent, pageMetadata);
};
exports.buildPageHTMLObject = buildPageHTMLObject;
const buildPageHTMLMetadata = (createdTimestamp, updatedTimestamp) => {
    return new _page_cls_module_1.PageHTMLMetadata(createdTimestamp, updatedTimestamp);
};
exports.buildPageHTMLMetadata = buildPageHTMLMetadata;
const renderEjsFile = async (skeletonTemplatePath, pageRenderData) => {
    return await ejs_1.default.renderFile(skeletonTemplatePath, pageRenderData);
};
exports.renderEjsFile = renderEjsFile;
const buildPageRenderData = (pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject, assets) => {
    return new RenderData_Page_1.RenderData_Page(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject, assets);
};
exports.buildPageRenderData = buildPageRenderData;
const getSkeletonTemplatePath = (__dirname, bootstrapVersion, templateVersion) => {
    return `${__dirname}/templates/html/${bootstrapVersion}/skeleton/${templateVersion}/index.ejs`;
};
exports.getSkeletonTemplatePath = getSkeletonTemplatePath;
const constructPage = async (pageContent, pageConfig, headerHTMLObject, footerHTMLObject, __dirname, constructArea, guidFn) => {
    const templateVersion = pageConfig.templateVersion;
    const uuid = guidFn();
    const skeletonTemplatePath = (0, exports.getSkeletonTemplatePath)(__dirname, pageConfig.bootstrapVersion, templateVersion);
    const areaConfigArr = pageConfig.areaConfigArr;
    const areasContentObject = pageContent.data;
    const areaHTMLObjectsPromiseArr = areaConfigArr.map(async (areaConfig) => {
        const areaContent = areasContentObject[areaConfig.uuid];
        if (!areaContent)
            throw new Error("areaContent cannot be undefined");
        const areaHTMLObject = await constructArea(areaConfig, areaContent);
        return areaHTMLObject;
    });
    const areaHTMLObjectsArr = await Promise.all(areaHTMLObjectsPromiseArr);
    const pageRenderData = (0, exports.buildPageRenderData)(pageConfig, pageContent, headerHTMLObject, areaHTMLObjectsArr, footerHTMLObject, pageConfig.assets);
    const pageHtml = await (0, exports.renderEjsFile)(skeletonTemplatePath, pageRenderData);
    const createdTimestamp = Date.now();
    const updatedTimestamp = createdTimestamp;
    const pageMetadata = (0, exports.buildPageHTMLMetadata)(createdTimestamp, updatedTimestamp);
    const pageHTMLObject = (0, exports.buildPageHTMLObject)(uuid, pageHtml, pageConfig, pageContent, pageMetadata);
    return pageHTMLObject;
};
exports.constructPage = constructPage;
//# sourceMappingURL=constructPage.js.map