"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructArea = exports.getCols = exports.getClassString = exports.constructChildHTMLObject = void 0;
const _page_cls_module_1 = require("@page_cls_module");
const ejs_1 = __importDefault(require("ejs"));
const getDirName_1 = __importDefault(require("../../../utils/getDirName"));
const guid_1 = __importDefault(require("../../../utils/guid"));
const RenderData_Area_1 = require("../../../classes/renderData/areas/RenderData_Area");
const constructBlock_1 = __importDefault(require("./constructBlock"));
const constructChildHTMLObject = async (childConfig, areaContent, constructArea) => {
    if (childConfig instanceof _page_cls_module_1.AreaConfig) {
        const childAreaContent = areaContent.data[childConfig.uuid];
        if (!childAreaContent)
            throw new Error("childAreaContent cannot be undefined");
        if (!(childAreaContent instanceof _page_cls_module_1.AreaContent))
            throw new Error("childAreaContent must be an instance of AreaContent");
        const areaHTMLObject = await constructArea(childConfig, childAreaContent);
        return areaHTMLObject;
    }
    else if (childConfig instanceof _page_cls_module_1.BlockConfig) {
        const childContent = areaContent.data[childConfig.uuid];
        if (!childContent)
            throw new Error("childContent cannot be undefined");
        if (!(childContent instanceof _page_cls_module_1.BlockContent))
            throw new Error("childContent must be an instance of BlockContent");
        const blockHTMLObject = await (0, constructBlock_1.default)(childContent, childConfig);
        return blockHTMLObject;
    }
    else {
        throw new Error("can only handle AreaConfig and BlockConfig type objects");
    }
};
exports.constructChildHTMLObject = constructChildHTMLObject;
const getClassString = (areaConfig) => {
    const classes = [];
    if (areaConfig.justify)
        classes.push(areaConfig.justify);
    if (areaConfig.align)
        classes.push(areaConfig.align);
    if (areaConfig.isIncludeContainer)
        classes.push("container");
    return classes.join(" ");
};
exports.getClassString = getClassString;
const getCols = (areaTemplateName) => {
    return areaTemplateName ? areaTemplateName.split("_").map(_ => Number(_)) : [];
};
exports.getCols = getCols;
const constructArea = async (areaConfig, areaContent) => {
    const __dirname = (0, getDirName_1.default)();
    const bootstrapVersion = areaConfig.bootstrapVersion;
    const areaTemplateName = areaConfig.areaTemplateName;
    const cols = (0, exports.getCols)(areaTemplateName);
    const HTMLObjectPromiseArr = areaConfig.childConfigArr.map(async (childConfig) => {
        return (0, exports.constructChildHTMLObject)(childConfig, areaContent, exports.constructArea);
    });
    const HTMLObjectArr = await Promise.all(HTMLObjectPromiseArr);
    const classString = (0, exports.getClassString)(areaConfig);
    const areaRenderData = new RenderData_Area_1.RenderData_Area(areaConfig, areaContent, HTMLObjectArr, cols, classString);
    const uuid = (0, guid_1.default)();
    const createdTimestamp = Date.now();
    const updatedTimestamp = createdTimestamp;
    const areaTemplatePath = `${__dirname}/templates/html/${bootstrapVersion}/area/index.ejs`;
    const areaHtml = await ejs_1.default.renderFile(areaTemplatePath, areaRenderData);
    const areaMetadata = new _page_cls_module_1.AreaHTMLMetadata(createdTimestamp, updatedTimestamp);
    const areaHTMLObject = new _page_cls_module_1.AreaHTMLObject(uuid, areaHtml, areaConfig, areaContent, areaMetadata);
    return areaHTMLObject;
};
exports.constructArea = constructArea;
exports.default = exports.constructArea;
//# sourceMappingURL=constructArea.js.map