"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderConfigMetadata = exports.buildHeaderConfigMetadata = void 0;
const __1 = require("../../");
const buildHeaderConfigMetadata = (obj) => {
    const metadata = new HeaderConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildHeaderConfigMetadata = buildHeaderConfigMetadata;
class HeaderConfigMetadata extends __1.Metadata {
}
exports.HeaderConfigMetadata = HeaderConfigMetadata;
//# sourceMappingURL=HeaderConfigMetadata.js.map