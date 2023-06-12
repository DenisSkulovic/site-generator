"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHTMLMetadata = exports.buildPageHTMLMetadata = void 0;
const Metadata_1 = require("src/components/Metadata");
const buildPageHTMLMetadata = (obj) => {
    const metadata = new PageHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildPageHTMLMetadata = buildPageHTMLMetadata;
class PageHTMLMetadata extends Metadata_1.Metadata {
}
exports.PageHTMLMetadata = PageHTMLMetadata;
//# sourceMappingURL=PageHTMLMetadata.js.map