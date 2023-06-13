import { buildAreaConfig } from "../Config/AreaConfig";
import { buildAreaHTMLMetadata } from "./AreaHTMLMetadata";
import { buildAreaContent } from "../Content/AreaContent";
export const buildAreaHTMLObject = (obj) => {
    if (obj.clazz !== "AreaHTMLObject")
        throw new Error("clazz cannot be anything other than 'AreaHTMLObject'");
    const config = buildAreaConfig(obj.config);
    const areaMetadata = buildAreaHTMLMetadata(obj.areaMetadata);
    const content = buildAreaContent(obj.content);
    const areaHTMLObject = new AreaHTMLObject(obj.uuid, obj.html, config, content, areaMetadata);
    return areaHTMLObject;
};
export class AreaHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=AreaHTMLObject.js.map