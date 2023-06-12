"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterContentMetadata = exports.buildFooterContentMetadata = void 0;
const Metadata_1 = require("@/components/Metadata");
const buildFooterContentMetadata = (obj) => {
    const metadata = new FooterContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildFooterContentMetadata = buildFooterContentMetadata;
class FooterContentMetadata extends Metadata_1.Metadata {
}
exports.FooterContentMetadata = FooterContentMetadata;
//# sourceMappingURL=FooterContentMetadata.js.map