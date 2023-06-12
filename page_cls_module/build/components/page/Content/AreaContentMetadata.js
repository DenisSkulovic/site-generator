"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaContentMetadata = exports.buildAreaContentMetadata = void 0;
const Metadata_1 = require("@/components/Metadata");
const buildAreaContentMetadata = (obj) => {
    const metadata = new AreaContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
exports.buildAreaContentMetadata = buildAreaContentMetadata;
class AreaContentMetadata extends Metadata_1.Metadata {
}
exports.AreaContentMetadata = AreaContentMetadata;
//# sourceMappingURL=AreaContentMetadata.js.map