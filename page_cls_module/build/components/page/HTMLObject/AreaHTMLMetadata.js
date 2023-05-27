"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHTMLMetadata = exports.buildAreaHTMLMetadata = void 0;
const buildAreaHTMLMetadata = (obj) => {
    if (obj.clazz !== "AreaHTMLMetadata")
        throw new Error("clazz cannot be anything other than 'AreaHTMLMetadata'");
    const areaHTMLMetadata = new AreaHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return areaHTMLMetadata;
};
exports.buildAreaHTMLMetadata = buildAreaHTMLMetadata;
class AreaHTMLMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.AreaHTMLMetadata = AreaHTMLMetadata;
//# sourceMappingURL=AreaHTMLMetadata.js.map