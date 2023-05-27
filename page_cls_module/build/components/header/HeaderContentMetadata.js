"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderContentMetadata = exports.buildHeaderContentMetadata = void 0;
const buildHeaderContentMetadata = (obj) => {
    if (obj.clazz !== "HeaderContentMetadata")
        throw new Error("clazz cannot be anything other than 'HeaderContentMetadata'");
    const headerContentMetadata = new HeaderContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return headerContentMetadata;
};
exports.buildHeaderContentMetadata = buildHeaderContentMetadata;
class HeaderContentMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.HeaderContentMetadata = HeaderContentMetadata;
//# sourceMappingURL=HeaderContentMetadata.js.map