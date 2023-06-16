import { buildFooterHTMLMetadata } from "./FooterHTMLMetadata";
export const buildFooterHTMLObject = (obj) => {
    if (obj.clazz !== "FooterHTMLObject")
        throw new Error("clazz cannot be anything other than 'FooterHTMLObject'");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const metadata = buildFooterHTMLMetadata(obj.metadata);
    const headerHTMLObject = new FooterHTMLObject(obj.uuid, obj.html, metadata);
    return headerHTMLObject;
};
export class FooterHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=FooterHTMLObject.js.map