import { buildFooterHTMLMetadata } from "./FooterHTMLMetadata";
import { buildFooterContent } from "./FooterContent";
import { buildFooterConfig } from "./FooterConfig";
export const buildFooterHTMLObject = (obj) => {
    if (obj.clazz !== "FooterHTMLObject")
        throw new Error("clazz cannot be anything other than 'FooterHTMLObject'");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const content = buildFooterContent(obj.content);
    const config = buildFooterConfig(obj.config);
    const metadata = buildFooterHTMLMetadata(obj.metadata);
    const headerHTMLObject = new FooterHTMLObject(obj.uuid, obj.html, content, config, metadata);
    return headerHTMLObject;
};
export class FooterHTMLObject {
    constructor(uuid, html, content, config, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.content = content;
        this.config = config;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=FooterHTMLObject.js.map