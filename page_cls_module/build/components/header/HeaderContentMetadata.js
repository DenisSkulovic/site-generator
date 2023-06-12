"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderContentMetadata = exports.buildHeaderContentMetadata = void 0;
const Metadata_1 = require("@/components/Metadata");
const buildHeaderContentMetadata = (obj) => {
    const metadata = new HeaderContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildHeaderContentMetadata = buildHeaderContentMetadata;
class HeaderContentMetadata extends Metadata_1.Metadata {
}
exports.HeaderContentMetadata = HeaderContentMetadata;
//# sourceMappingURL=HeaderContentMetadata.js.map