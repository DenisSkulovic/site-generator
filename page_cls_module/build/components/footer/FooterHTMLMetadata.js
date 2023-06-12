"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterHTMLMetadata = exports.buildFooterHTMLMetadata = void 0;
const Metadata_1 = require("@/components/Metadata");
const buildFooterHTMLMetadata = (obj) => {
    const metadata = new FooterHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildFooterHTMLMetadata = buildFooterHTMLMetadata;
class FooterHTMLMetadata extends Metadata_1.Metadata {
}
exports.FooterHTMLMetadata = FooterHTMLMetadata;
//# sourceMappingURL=FooterHTMLMetadata.js.map