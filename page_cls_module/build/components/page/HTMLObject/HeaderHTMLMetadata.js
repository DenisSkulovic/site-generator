"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderHTMLMetadata = exports.buildHeaderHTMLMetadata = void 0;
const Metadata_1 = require("@/components/Metadata");
const buildHeaderHTMLMetadata = (obj) => {
    const metadata = new HeaderHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildHeaderHTMLMetadata = buildHeaderHTMLMetadata;
class HeaderHTMLMetadata extends Metadata_1.Metadata {
}
exports.HeaderHTMLMetadata = HeaderHTMLMetadata;
//# sourceMappingURL=HeaderHTMLMetadata.js.map