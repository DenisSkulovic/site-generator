import { buildPageHTMLMetadata } from "./PageHTMLMetadata";
export const buildPageHTMLObject = (obj) => {
    if (obj.clazz !== "PageHTMLObject")
        throw new Error("clazz cannot be anything other than 'PageHTMLObject'");
    const pageHTMLMetadata = buildPageHTMLMetadata(obj.metadata);
    const pageHTMLObject = new PageHTMLObject(obj.uuid, obj.html, pageHTMLMetadata);
    return pageHTMLObject;
};
export class PageHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=PageHTMLObject.js.map