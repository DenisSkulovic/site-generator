import { buildAreaContent } from "./AreaContent";
import { buildPageContentMetadata } from "./PageContentMetadata";
export const buildPageContent = (obj) => {
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
        const areaContent = buildAreaContent(rawAreaContent);
        data[areaConfigId] = areaContent;
    });
    const metadata = buildPageContentMetadata(obj.metadata);
    const pageContent = new PageContent(uuid, data, metadata);
    return pageContent;
};
export class PageContent {
    constructor(uuid, data, metadata) {
        this.uuid = uuid;
        this.data = data;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=PageContent.js.map