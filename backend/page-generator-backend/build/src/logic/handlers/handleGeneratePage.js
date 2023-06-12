"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _page_cls_module_1 = require("@page_cls_module");
const constructPage_1 = require("../page-builder/page/constructPage");
const constructArea_1 = __importDefault(require("../page-builder/page/constructArea"));
const fetchFooterFromS3_1 = __importDefault(require("../page-builder/footer/fetchFooterFromS3"));
const fetchHeaderFromS3_1 = __importDefault(require("../page-builder/header/fetchHeaderFromS3"));
const guid_1 = __importDefault(require("@/utils/guid"));
const handleGeneratePage = async (requestData) => {
    console.log(`>>> handleGeneratePage`);
    const content = requestData.content;
    const config = requestData.config;
    const promises = [
        (0, fetchHeaderFromS3_1.default)(),
        (0, fetchFooterFromS3_1.default)(),
    ];
    const [headerHTMLObject, footerHTMLObject] = await Promise.all(promises);
    if (!headerHTMLObject)
        throw new Error("failed to fetch header");
    if (!footerHTMLObject)
        throw new Error("failed to fetch footer");
    const pageHTMLObject = await (0, constructPage_1.constructPage)(content, config, headerHTMLObject, footerHTMLObject, __dirname, constructArea_1.default, guid_1.default);
    const resp = new _page_cls_module_1.GeneratePageResponse(pageHTMLObject);
    console.log(`handleGeneratePage resp`, resp);
    console.log(`<<< handleGeneratePage`);
    return resp;
};
exports.default = handleGeneratePage;
//# sourceMappingURL=handleGeneratePage.js.map