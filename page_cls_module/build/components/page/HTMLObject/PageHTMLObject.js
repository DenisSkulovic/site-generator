import { buildPageConfig } from "../Config/PageConfig";
import { buildPageHTMLMetadata } from "./PageHTMLMetadata";
import { buildPageContent } from "../Content/PageContent";
export const buildPageHTMLObject = (obj) => {
    if (obj.clazz !== "PageHTMLObject")
        throw new Error("clazz cannot be anything other than 'PageHTMLObject'");
    const config = buildPageConfig(obj.config);
    const pageHTMLMetadata = buildPageHTMLMetadata(obj.metadata);
    const content = buildPageContent(obj.content);
    const pageHTMLObject = new PageHTMLObject(obj.uuid, obj.html, config, content, pageHTMLMetadata);
    return pageHTMLObject;
};
export class PageHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=PageHTMLObject.js.map