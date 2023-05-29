"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constructArea_1 = __importDefault(require("../page-builder/page/constructArea"));
const _page_cls_module_1 = require("@page_cls_module");
const handleGenerateArea = async (requestData) => {
    console.log(`>>> handleGenerateArea`);
    const config = requestData.config;
    const content = requestData.content;
    const areaHTMLObject = await (0, constructArea_1.default)(config, content);
    const res = new _page_cls_module_1.GenerateAreaResponse(areaHTMLObject);
    console.log(`handleGenerateArea res`, res);
    console.log(`<<< handleGenerateArea`);
    return res;
};
exports.default = handleGenerateArea;
//# sourceMappingURL=handleGenerateArea.js.map