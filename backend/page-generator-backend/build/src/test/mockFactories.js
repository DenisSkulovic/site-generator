"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRenderDataFooter = exports.createRenderDataHeader = exports.createRenderDataPage = void 0;
const RenderData_Footer_1 = require("@/classes/renderData/pages/RenderData_Footer");
const RenderData_Header_1 = require("@/classes/renderData/pages/RenderData_Header");
const RenderData_Page_1 = require("@/classes/renderData/pages/RenderData_Page");
const mockFactories_1 = require("../../../../page_cls_module/src/mockFactories");
const createRenderDataPage = ({ config = (0, mockFactories_1.createPageConfig)({}), content = (0, mockFactories_1.createPageContent)({}), headerHTMLObject = (0, mockFactories_1.createHeaderHTMLObject)({}), areaHTMLObjectArr = [(0, mockFactories_1.createAreaHTMLObject)({})], footerHTMLObject = (0, mockFactories_1.createFooterHTMLObject)({}), assets = [(0, mockFactories_1.createScriptAsset)({})], }) => {
    return new RenderData_Page_1.RenderData_Page(config, content, headerHTMLObject, areaHTMLObjectArr, footerHTMLObject, assets);
};
exports.createRenderDataPage = createRenderDataPage;
const createRenderDataHeader = ({ content = (0, mockFactories_1.createHeaderContent)({}), config = (0, mockFactories_1.createHeaderConfig)({}), }) => {
    return new RenderData_Header_1.RenderData_Header(content, config);
};
exports.createRenderDataHeader = createRenderDataHeader;
const createRenderDataFooter = ({ content = (0, mockFactories_1.createFooterContent)({}), config = (0, mockFactories_1.createFooterConfig)({}), }) => {
    return new RenderData_Footer_1.RenderData_Footer(content, config);
};
exports.createRenderDataFooter = createRenderDataFooter;
//# sourceMappingURL=mockFactories.js.map