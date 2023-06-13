import { buildHeaderConfig } from "../../header/HeaderConfig";
import { buildHeaderHTMLMetadata } from "./HeaderHTMLMetadata";
import { buildHeaderContent } from "../../header/HeaderContent";
export const buildHeaderHTMLObject = (obj) => {
    if (obj.clazz !== "HeaderHTMLObject")
        throw new Error("clazz cannot be anything other than 'HeaderHTMLObject'");
    if (!obj.html)
        throw new Error("html cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const config = buildHeaderConfig(obj.config);
    const content = buildHeaderContent(obj.content);
    const metadata = buildHeaderHTMLMetadata(obj.metadata);
    const headerHTMLObject = new HeaderHTMLObject(obj.uuid, obj.html, config, content, metadata);
    return headerHTMLObject;
};
export class HeaderHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=HeaderHTMLObject.js.map