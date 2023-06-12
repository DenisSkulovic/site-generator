"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGeneratePage = exports.handleGenerateHeader = exports.handleGenerateFooter = void 0;
const PageGenerator_1 = require("@/generator/PageGenerator");
const _page_cls_module_1 = require("@page_cls_module");
const handleGenerateFooter = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const generateFooterRequest = (0, _page_cls_module_1.buildGenerateFooterRequest)(body);
    const generator = new PageGenerator_1.PageGenerator(env);
    const footer = await generator.generateFooter(generateFooterRequest.content, generateFooterRequest.config);
    return footer;
};
exports.handleGenerateFooter = handleGenerateFooter;
const handleGenerateHeader = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const generateHeaderRequest = (0, _page_cls_module_1.buildGenerateHeaderRequest)(body);
    const generator = new PageGenerator_1.PageGenerator(env);
    const header = await generator.generateHeader(generateHeaderRequest.content, generateHeaderRequest.config);
    return header;
};
exports.handleGenerateHeader = handleGenerateHeader;
const handleGeneratePage = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const generatePageRequest = (0, _page_cls_module_1.buildGeneratePageRequest)(body);
    const generator = new PageGenerator_1.PageGenerator(env);
    const page = await generator.generatePage(generatePageRequest.content, generatePageRequest.config);
    return page;
};
exports.handleGeneratePage = handleGeneratePage;
//# sourceMappingURL=index.js.map