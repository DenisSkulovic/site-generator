import { HeaderTemplateVersionEnum, BootstrapVersionEnum } from "../../";
import { buildHeaderConfigMetadata } from "./HeaderConfigMetadata";
export const buildHeaderConfig = (obj) => {
    if (!obj.uuid)
        throw new Error("uuid cannot be undefined");
    if (obj.clazz !== "HeaderConfig")
        throw new Error("clazz cannot be anything other than 'HeaderConfig'");
    const metadata = buildHeaderConfigMetadata(obj.metadata);
    if (!Object.values(HeaderTemplateVersionEnum).includes(obj.templateVersion))
        throw new Error("unrecognized templateVersion");
    if (!Object.values(BootstrapVersionEnum).includes(obj.bootstrapVersion))
        throw new Error("unrecognized bootstrapVersion");
    const headerConfig = new HeaderConfig(obj.uuid, obj.templateVersion, obj.bootstrapVersion, obj.isIncludeNavbar, metadata);
    return headerConfig;
};
export class HeaderConfig {
    constructor(uuid, templateVersion, bootstrapVersion, isIncludeNavbar, metadata) {
        this.uuid = uuid;
        this.templateVersion = templateVersion;
        this.bootstrapVersion = bootstrapVersion;
        this.isIncludeNavbar = isIncludeNavbar;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=HeaderConfig.js.map