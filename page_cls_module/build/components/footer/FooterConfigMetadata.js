"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterConfigMetadata = exports.buildFooterConfigMetadata = void 0;
const __1 = require("../../");
const buildFooterConfigMetadata = (obj) => {
    const metadata = new FooterConfigMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildFooterConfigMetadata = buildFooterConfigMetadata;
class FooterConfigMetadata extends __1.Metadata {
}
exports.FooterConfigMetadata = FooterConfigMetadata;
//# sourceMappingURL=FooterConfigMetadata.js.map