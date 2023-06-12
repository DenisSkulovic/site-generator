"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaHTMLMetadata = exports.buildAreaHTMLMetadata = void 0;
const Metadata_1 = require("@/components/Metadata");
const buildAreaHTMLMetadata = (obj) => {
    const metadata = new AreaHTMLMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildAreaHTMLMetadata = buildAreaHTMLMetadata;
class AreaHTMLMetadata extends Metadata_1.Metadata {
}
exports.AreaHTMLMetadata = AreaHTMLMetadata;
//# sourceMappingURL=AreaHTMLMetadata.js.map