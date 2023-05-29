"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHTMLObject = exports.buildAreaHTMLObject = void 0;
const AreaConfig_1 = require("../Config/AreaConfig");
const AreaHTMLMetadata_1 = require("./AreaHTMLMetadata");
const AreaContent_1 = require("../Content/AreaContent");
const buildAreaHTMLObject = (obj) => {
    if (obj.clazz !== "AreaHTMLObject")
        throw new Error("clazz cannot be anything other than 'AreaHTMLObject'");
    const config = (0, AreaConfig_1.buildAreaConfig)(obj.config);
    const areaMetadata = (0, AreaHTMLMetadata_1.buildAreaHTMLMetadata)(obj.areaMetadata);
    const content = (0, AreaContent_1.buildAreaContent)(obj.content);
    const areaHTMLObject = new AreaHTMLObject(obj.uuid, obj.html, config, content, areaMetadata);
    return areaHTMLObject;
};
exports.buildAreaHTMLObject = buildAreaHTMLObject;
class AreaHTMLObject {
    constructor(uuid, html, config, content, metadata) {
        this.uuid = uuid;
        this.html = html;
        this.config = config;
        this.content = content;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.AreaHTMLObject = AreaHTMLObject;
//# sourceMappingURL=AreaHTMLObject.js.map