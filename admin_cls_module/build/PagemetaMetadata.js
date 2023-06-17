"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagemetaMetadata = exports.buildPagemetaMetadata = void 0;
const buildPagemetaMetadata = (obj) => {
    const metadata = new PagemetaMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildPagemetaMetadata = buildPagemetaMetadata;
class PagemetaMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.PagemetaMetadata = PagemetaMetadata;
//# sourceMappingURL=PagemetaMetadata.js.map