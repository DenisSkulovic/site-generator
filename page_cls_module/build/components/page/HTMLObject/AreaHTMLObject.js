import { buildAreaHTMLMetadata } from "./AreaHTMLMetadata";
export const buildAreaHTMLObject = (obj) => {
    if (obj.clazz !== "AreaHTMLObject")
        throw new Error("clazz cannot be anything other than 'AreaHTMLObject'");
    const areaMetadata = buildAreaHTMLMetadata(obj.areaMetadata);
    const areaHTMLObject = new AreaHTMLObject(obj.uuid, obj.html, areaMetadata);
    return areaHTMLObject;
};
export class AreaHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=AreaHTMLObject.js.map