"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderConfig = exports.buildHeaderConfig = void 0;
const __1 = require("../../");
const HeaderConfigMetadata_1 = require("./HeaderConfigMetadata");
const buildHeaderConfig = (obj) => {
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (obj.clazz !== "HeaderConfig")
        throw new Error("clazz cannot be anything other than 'HeaderConfig'");
    const metadata = (0, HeaderConfigMetadata_1.buildHeaderConfigMetadata)(obj.metadata);
    if (!Object.values(__1.HeaderTemplateVersionEnum).includes(obj.templateVersion))
        throw new Error("unrecognized templateVersion");
    if (!Object.values(__1.BootstrapVersionEnum).includes(obj.bootstrapVersion))
        throw new Error("unrecognized bootstrapVersion");
    const headerConfig = new HeaderConfig(obj.uuid, obj.templateVersion, obj.bootstrapVersion, obj.isIncludeNavbar, metadata);
    return headerConfig;
};
exports.buildHeaderConfig = buildHeaderConfig;
class HeaderConfig {
    constructor(uuid, templateVersion, bootstrapVersion, isIncludeNavbar, metadata) {
        this.uuid = uuid;
        this.templateVersion = templateVersion;
        this.bootstrapVersion = bootstrapVersion;
        this.isIncludeNavbar = isIncludeNavbar;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.HeaderConfig = HeaderConfig;
//# sourceMappingURL=HeaderConfig.js.map