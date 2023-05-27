"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderConfigMetadata = exports.buildHeaderConfigMetadata = void 0;
const buildHeaderConfigMetadata = (obj) => {
    if (obj.clazz !== "HeaderConfigMetadata")
        throw new Error("clazz cannot be anything other than 'HeaderConfigMetadata'");
    const metadata = new HeaderConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildHeaderConfigMetadata = buildHeaderConfigMetadata;
class HeaderConfigMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.HeaderConfigMetadata = HeaderConfigMetadata;
//# sourceMappingURL=HeaderConfigMetadata.js.map