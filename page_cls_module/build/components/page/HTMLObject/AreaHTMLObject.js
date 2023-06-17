"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHTMLObject = exports.buildAreaHTMLObject = void 0;
const AreaHTMLMetadata_1 = require("./AreaHTMLMetadata");
const buildAreaHTMLObject = (obj) => {
    if (obj.clazz !== "AreaHTMLObject")
        throw new Error("clazz cannot be anything other than 'AreaHTMLObject'");
    const areaMetadata = (0, AreaHTMLMetadata_1.buildAreaHTMLMetadata)(obj.areaMetadata);
    const areaHTMLObject = new AreaHTMLObject(obj.uuid, obj.html, areaMetadata);
    return areaHTMLObject;
};
exports.buildAreaHTMLObject = buildAreaHTMLObject;
class AreaHTMLObject {
    constructor(uuid, html, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.AreaHTMLObject = AreaHTMLObject;
//# sourceMappingURL=AreaHTMLObject.js.map