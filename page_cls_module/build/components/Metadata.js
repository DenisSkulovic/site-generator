"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = exports.buildMetadata = void 0;
const buildMetadata = (obj) => {
    const metadata = new Metadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildMetadata = buildMetadata;
class Metadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=Metadata.js.map