"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContent = exports.buildPageContent = void 0;
const AreaContent_1 = require("./AreaContent");
const PageContentMetadata_1 = require("./PageContentMetadata");
const buildPageContent = (obj) => {
    if (obj.clazz !== "PageContent")
        throw new Error("clazz cannot be anything other than 'PageContent'");
    const rawData = obj.data;
    const uuid = obj.uuid;
    if (!uuid)
        throw new Error("uuid cannot be undefined");
    const data = {};
    Object.entries(rawData).forEach((entry) => {
        const areaConfigId = entry[0];
        const rawAreaContent = entry[1];
        const areaContent = (0, AreaContent_1.buildAreaContent)(rawAreaContent);
        data[areaConfigId] = areaContent;
    });
    const metadata = (0, PageContentMetadata_1.buildPageContentMetadata)(obj.metadata);
    const pageContent = new PageContent(uuid, data, metadata);
    return pageContent;
};
exports.buildPageContent = buildPageContent;
class PageContent {
    constructor(uuid, data, metadata) {
        this.uuid = uuid;
        this.data = data;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.PageContent = PageContent;
//# sourceMappingURL=PageContent.js.map