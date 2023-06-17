"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageConfigMetadata = exports.buildPageConfigMetadata = void 0;
const __1 = require("../../../");
const buildPageConfigMetadata = (obj) => {
    const metadata = new PageConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildPageConfigMetadata = buildPageConfigMetadata;
class PageConfigMetadata extends __1.Metadata {
}
exports.PageConfigMetadata = PageConfigMetadata;
//# sourceMappingURL=PageConfigMetadata.js.map