"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _page_cls_module_1 = require("@page_cls_module");
const constructBlock_1 = __importDefault(require("../page-builder/page/constructBlock"));
const handleGenerateBlock = async (requestData) => {
    console.log(`>>> handleGenerateBlock`);
    const config = requestData.config;
    const content = requestData.content;
    const blockHTMLObject = await (0, constructBlock_1.default)(content, config);
    const res = new _page_cls_module_1.GenerateBlockResponse(blockHTMLObject);
    console.log(`handleGenerateBlock res`, res);
    console.log(`<<< handleGenerateBlock`);
    return res;
};
exports.default = handleGenerateBlock;
//# sourceMappingURL=handleGenerateBlock.js.map