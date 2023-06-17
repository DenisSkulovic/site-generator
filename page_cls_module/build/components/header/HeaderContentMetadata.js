"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderContentMetadata = exports.buildHeaderContentMetadata = void 0;
const __1 = require("../../");
const buildHeaderContentMetadata = (obj) => {
    const metadata = new HeaderContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildHeaderContentMetadata = buildHeaderContentMetadata;
class HeaderContentMetadata extends __1.Metadata {
}
exports.HeaderContentMetadata = HeaderContentMetadata;
//# sourceMappingURL=HeaderContentMetadata.js.map