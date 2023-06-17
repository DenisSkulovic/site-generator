"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaConfigMetadata = exports.buildAreaConfigMetadata = void 0;
const __1 = require("../../../");
const buildAreaConfigMetadata = (obj) => {
    const metadata = new AreaConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildAreaConfigMetadata = buildAreaConfigMetadata;
class AreaConfigMetadata extends __1.Metadata {
}
exports.AreaConfigMetadata = AreaConfigMetadata;
//# sourceMappingURL=AreaConfigMetadata.js.map