"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContentMetadata = exports.buildPageContentMetadata = void 0;
const Metadata_1 = require("@/components/Metadata");
const buildPageContentMetadata = (obj) => {
    const metadata = new PageContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildPageContentMetadata = buildPageContentMetadata;
class PageContentMetadata extends Metadata_1.Metadata {
}
exports.PageContentMetadata = PageContentMetadata;
//# sourceMappingURL=PageContentMetadata.js.map