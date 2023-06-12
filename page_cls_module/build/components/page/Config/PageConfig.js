"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageConfig = exports.buildPageConfig = void 0;
const __1 = require("../../../");
const AreaConfig_1 = require("./AreaConfig");
const PageConfigMetadata_1 = require("./PageConfigMetadata");
const buildPageConfig = (obj) => {
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (!obj.pageName)
        throw new Error("pageName cannot be undefined");
    if (obj.clazz !== "PageConfig")
        throw new Error("clazz cannot be anything other than 'PageConfig'");
    if (!Array.isArray(obj.areaConfigArr))
        throw new Error("obj.areaConfigArr must be an array of strings");
    if (!Object.values(__1.BootstrapVersionEnum).includes(obj.bootstrapVersion))
        throw new Error("unrecognized bootstrapVersion");
    if (!Object.values(__1.SkeletonVersionEnum).includes(obj.templateVersion))
        throw new Error("unrecognized skeleton templateVersion");
    if (!Object.values(__1.HeadVersionEnum).includes(obj.headVersion))
        throw new Error("unrecognized headVersion");
    if (!Object.values(__1.LangEnum).includes(obj.lang))
        throw new Error("unrecognized lang");
    const lang = obj.lang;
    const bootstrapVersion = obj.bootstrapVersion;
    const templateVersion = obj.templateVersion;
    const assets = obj.assets; // TODO build asset instances based on clazz
    const metadata = (0, PageConfigMetadata_1.buildPageConfigMetadata)(obj.metadata);
    const areaConfigArr = obj.areaConfigArr.map((obj) => {
        return (0, AreaConfig_1.buildAreaConfig)(obj);
    });
    const pageConfig = new PageConfig(obj.uuid, lang, obj.pageName, obj.pagePath, obj.contentId, Boolean(obj.isIncludeBootstrap), obj.headVersion, bootstrapVersion, templateVersion, areaConfigArr, assets, metadata);
    return pageConfig;
};
exports.buildPageConfig = buildPageConfig;
class PageConfig {
    constructor(uuid, lang, pageName, pagePath, contentId, isIncludeBootstrap, headVersion, bootstrapVersion, templateVersion, areaConfigArr, assets, metadata) {
        this.uuid = uuid;
        this.lang = lang;
        this.pageName = pageName;
        this.pagePath = pagePath;
        this.contentId = contentId;
        this.isIncludeBootstrap = isIncludeBootstrap;
        this.headVersion = headVersion;
        this.bootstrapVersion = bootstrapVersion;
        this.templateVersion = templateVersion;
        this.areaConfigArr = areaConfigArr;
        this.assets = assets;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.PageConfig = PageConfig;
//# sourceMappingURL=PageConfig.js.map