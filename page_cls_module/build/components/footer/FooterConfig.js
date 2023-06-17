"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterConfig = exports.buildFooterConfig = void 0;
const __1 = require("../../");
const FooterConfigMetadata_1 = require("./FooterConfigMetadata");
const buildFooterConfig = (obj) => {
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (!obj.metadata)
        throw new Error("metadata cannot be undefined");
    const metadata = (0, FooterConfigMetadata_1.buildFooterConfigMetadata)(obj.metadata);
    if (obj.clazz !== "FooterConfig")
        throw new Error("clazz cannot be anything other than 'FooterConfig'");
    if (!Object.values(__1.FooterTemplateVersionEnum).includes(obj.templateVersion))
        throw new Error("unrecognized templateVersion");
    if (!Object.values(__1.BootstrapVersionEnum).includes(obj.bootstrapVersion))
        throw new Error("unrecognized bootstrapVersion");
    const footerConfig = new FooterConfig(obj.uuid, obj.templateVersion, obj.bootstrapVersion, metadata);
    return footerConfig;
};
exports.buildFooterConfig = buildFooterConfig;
class FooterConfig {
    constructor(uuid, templateVersion, bootstrapVersion, metadata) {
        this.uuid = uuid;
        this.templateVersion = templateVersion;
        this.bootstrapVersion = bootstrapVersion;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.FooterConfig = FooterConfig;
//# sourceMappingURL=FooterConfig.js.map