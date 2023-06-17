"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterContentMetadata = exports.buildFooterContentMetadata = void 0;
const __1 = require("../../");
const buildFooterContentMetadata = (obj) => {
    const metadata = new FooterContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildFooterContentMetadata = buildFooterContentMetadata;
class FooterContentMetadata extends __1.Metadata {
}
exports.FooterContentMetadata = FooterContentMetadata;
//# sourceMappingURL=FooterContentMetadata.js.map