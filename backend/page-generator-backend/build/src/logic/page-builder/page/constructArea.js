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
const RenderData_Area_1 = require("../../../classes/renderData/areas/RenderData_Area");
const constructBlock_1 = __importDefault(require("./constructBlock"));
/**
 * This function should not generate anything, and instead, it should only combine received html and create a page. Other functions are responsible for generation of HTML
 */
const constructArea = async (areaConfig, areaContent) => {
    const __dirname = (0, getDirName_1.default)();
    const bootstrapVersion = areaConfig.bootstrapVersion;
    const areaTemplateName = areaConfig.areaTemplateName;
    const cols = areaTemplateName ? areaTemplateName.split("_").map(_ => Number(_)) : [];
    const HTMLObjectPromiseArr = areaConfig.childConfigArr.map(async (childConfig) => {
        if (childConfig instanceof DTO.AreaConfig) {
            const childAreaContent = areaContent.data[childConfig.uuid];
            if (!childAreaContent)
                throw new Error("childAreaContent cannot be undefined");
            if (!(childAreaContent instanceof DTO.AreaContent))
                throw new Error("childAreaContent must be an instance of AreaContent");
            const areaHTMLObject = await constructArea(childConfig, childAreaContent);
            return areaHTMLObject;
        }
        else if (childConfig instanceof DTO.BlockConfig) {
            const childContent = areaContent.data[childConfig.uuid];
            if (!childContent)
                throw new Error("childContent cannot be undefined");
            if (!(childContent instanceof DTO.BlockContent))
                throw new Error("childContent must be an instance of BlockContent");
            const blockHTMLObject = await (0, constructBlock_1.default)(childContent, childConfig);
            return blockHTMLObject;
        }
        else {
            throw new Error("can only handle AreaConfig and BlockCOnfig type objects");
        }
    });
    const HTMLObjectArr = await Promise.all(HTMLObjectPromiseArr);
    const classes = [];
    if (areaConfig.justify)
        classes.push(areaConfig.justify);
    if (areaConfig.align)
        classes.push(areaConfig.align);
    if (areaConfig.isIncludeContainer)
        classes.push("container");
    const classString = classes.join(" ");
    const areaRenderData = new RenderData_Area_1.RenderData_Area(areaConfig, areaContent, HTMLObjectArr, cols, classString);
    const uuid = (0, guid_1.default)();
    const createdTimestamp = Date.now();
    const updatedTimestamp = createdTimestamp;
    const areaTemplatePath = `${__dirname}/templates/html/${bootstrapVersion}/area/index.ejs`;
    const areaHtml = await ejs_1.default.renderFile(areaTemplatePath, areaRenderData);
    const areaMetadata = new DTO.AreaHTMLMetadata(createdTimestamp, updatedTimestamp);
    const areaHTMLObject = new DTO.AreaHTMLObject(uuid, areaHtml, areaConfig, areaContent, areaMetadata);
    return areaHTMLObject;
};
exports.default = constructArea;
//# sourceMappingURL=constructArea.js.map